import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api.js'
import TaskForm from '../companets/TaskForm.jsx'
import TaskCard from '../companets/TaskCard.jsx'
import TaskFilter from '../companets/TaskFilter.jsx'

export default function HomePage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/tasks')
      .then(({ data }) => setTasks(data))
      .catch(() => toast.error('Не удалось загрузить задачи. Проверьте, что запущен npm run dev.'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      setTasks((prev) => prev.filter((t) => t.id !== id))
      toast.info('Задача удалена')
    } catch {
      toast.error('Не удалось удалить задачу')
    }
  }

  const visible = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.status)
    if (filter === 'done') return tasks.filter((t) => t.status)
    if (filter.startsWith('p:')) return tasks.filter((t) => t.priority === filter.slice(2))
    return tasks
  }, [tasks, filter])

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-semibold text-brand">Задачи</h1>
      <h2 className="mt-6 text-xl font-semibold text-brand">Форма добавления</h2>
      <div className="mt-6">
        <TaskForm onCreated={(task) => setTasks((prev) => [...prev, task])} />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-brand">Список задач</h2>
        <TaskFilter value={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-gray-500">Загрузка…</p>
      ) : visible.length === 0 ? (
        <p className="mt-8 text-sm text-gray-500">Задач нет. Создайте первую через форму выше.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((task) => <TaskCard key={task.id} task={task} onDelete={handleDelete} />)}
        </div>
      )}
    </div>
  )
}
