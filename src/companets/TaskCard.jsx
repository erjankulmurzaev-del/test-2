import { Link } from 'react-router-dom'
import { PRIORITIES } from '../priority.js'

export default function TaskCard({ task, onDelete }) {
  const p = PRIORITIES[task.priority] ?? PRIORITIES.normal
  return (
    <article className="relative flex min-h-[170px] flex-col rounded-2xl border border-black p-3">
      <span className={`absolute right-3 top-2 rounded px-2 py-0.5 text-[10px] ${p.cls}`}>{p.label}</span>
      <h3 className={`mt-4 pr-2 text-sm font-medium ${task.status ? 'line-through text-gray-500' : ''}`}>
        №{task.id} {task.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[11px] text-gray-700">{task.description}</p>
      <div className="mt-3 flex flex-col gap-1.5 px-4">
        <Link to={`/tasks/${task.id}`} className="btn-outline text-center">Открыть</Link>
        <button type="button" onClick={() => onDelete(task.id)} className="btn-outline">Удалить</button>
      </div>
    </article>
  )
}
