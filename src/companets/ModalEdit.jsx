import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  title: yup.string().trim().required('*Укажите название!'),
  description: yup.string().trim().required('*Укажите описание!'),
  status: yup.boolean(),
})

export default function ModalEdit({ task, onSave, onClose }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: task.title, description: task.description, status: task.status },
  })

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <form onSubmit={handleSubmit(onSave)} onClick={(e) => e.stopPropagation()} noValidate
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-brand">Изменить задачу</h2>
        <div>
          <input className="field" placeholder="Название" {...register('title')} />
          {errors.title && <p className="err">{errors.title.message}</p>}
        </div>
        <div>
          <textarea rows={4} placeholder="Описание"
            className="w-full rounded-2xl border border-black px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/40"
            {...register('description')} />
          {errors.description && <p className="err">{errors.description.message}</p>}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('status')} /> Выполнено
        </label>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="btn-outline">Отмена</button>
          <button type="submit" disabled={isSubmitting}
            className="rounded-full bg-brand px-5 py-1 text-xs text-white hover:bg-blue-700 disabled:opacity-60">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  )
}
