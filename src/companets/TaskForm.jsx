import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import api from '../services/api.js'
import { PRIORITIES } from '../priority.js'

const schema = yup.object({
  title: yup.string().trim().required('*Укажите название!'),
  description: yup.string().trim().required('*Укажите описание!'),
  priority: yup.string().nullable().required('*Укажите приоритет!'),
})

export default function TaskForm({ onCreated }) {
  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), defaultValues: { priority: null } })

  const onSubmit = async (values) => {
    try {
      const { data } = await api.post('/tasks', { ...values, status: false })
      onCreated(data)
      reset({ title: '', description: '', priority: null })
      toast.success('Задача создана')
    } catch {
      toast.error('Не удалось создать задачу')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col items-center gap-4">
      <div className="grid w-full gap-4 md:grid-cols-[1fr_1fr_auto]">
        <div>
          <input className="field" placeholder="Название" {...register('title')} />
          {errors.title && <p className="err">{errors.title.message}</p>}
        </div>
        <div>
          <input className="field" placeholder="Описание" {...register('description')} />
          {errors.description && <p className="err">{errors.description.message}</p>}
        </div>
        <div>
          <div className="flex h-9 items-center gap-2 rounded-full border border-black px-4 text-xs">
            <span>Приоритет:</span>
            {Object.entries(PRIORITIES).map(([key, p]) => (
              <label key={key} className="cursor-pointer">
                <input type="radio" value={key} className="peer sr-only" {...register('priority')} />
                <span className={`block rounded-full px-2 py-0.5 text-[10px] opacity-50 ring-offset-1 peer-checked:opacity-100 peer-checked:ring-2 peer-checked:ring-black peer-focus-visible:ring-2 ${p.cls}`}>
                  {p.label}
                </span>
              </label>
            ))}
          </div>
          {errors.priority && <p className="err">{errors.priority.message}</p>}
        </div>
      </div>
      <button type="submit" disabled={isSubmitting}
        className="rounded-full bg-brand px-6 py-2 text-xs text-white shadow hover:bg-blue-700 disabled:opacity-60">
        Создать задачу
      </button>
    </form>
  )
}
