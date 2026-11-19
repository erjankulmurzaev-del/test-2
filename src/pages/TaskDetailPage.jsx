import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../services/api.js'
import { PRIORITIES } from '../priority.js'
import ModalEdit from '../companets/ModalEdit.jsx'

export default function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(`/tasks/${id}`)
      .then(({ data }) => setTask(data))
      .catch(() => setTask(null))
      .finally(() => setLoading(false))
  }, [id])

  const handleSave = async (values) => {
    try {
      const { data } = await api.patch(`/tasks/${id}`, values)
      setTask(data)
      setEditing(false)
      toast.success('Изменения сохранены')
    } catch {
      toast.error('Не удалось сохранить изменения')
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${id}`)
      toast.info('Задача удалена')
      navigate('/')
    } catch {
      toast.error('Не удалось удалить задачу')
    }
  }

  if (loading) return <p className="pt-8 text-sm text-gray-500">Загрузка…</p>
  if (!task) {
    return (
      <div className="pt-8">
        <p className="text-sm">Задача не найдена.</p>
        <Link to="/" className="mt-3 inline-block text-sm text-brand underline">&lt; Назад</Link>
      </div>
    )
  }

  const p = PRIORITIES[task.priority] ?? PRIORITIES.normal

  return (
    <div className="pt-6">
      <Link to="/" className="text-sm text-brand hover:underline">&lt; Назад</Link>

      <article className="mx-auto mt-6 max-w-2xl rounded-2xl border border-black p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">ID: {task.id}</p>
            <h1 className="mt-1 break-words text-2xl font-semibold">{task.title}</h1>
          </div>
          <span className={`shrink-0 rounded px-2 py-0.5 text-xs ${p.cls}`}>{p.label}</span>
        </div>

        <p className="mt-4 whitespace-pre-wrap break-words text-sm text-gray-800">{task.description}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className={`rounded-full px-3 py-1 text-xs ${task.status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {task.status ? 'Выполнено' : 'В процессе'}
          </span>
          <div className="flex gap-2">
            <button onClick={() => setEditing(true)} aria-label="Редактировать" title="Редактировать"
              className="rounded-full border border-black p-2 hover:bg-gray-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </button>
            <button onClick={handleDelete} aria-label="Удалить" title="Удалить"
              className="rounded-full border border-black p-2 hover:bg-red-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
            </button>
          </div>
        </div>
      </article>

      {editing && <ModalEdit task={task} onSave={handleSave} onClose={() => setEditing(false)} />}
    </div>
  )
}
