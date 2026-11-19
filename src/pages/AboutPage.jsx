import { Link } from 'react-router-dom'
import illustration from '../assets/illustration.svg'

const VALUES = [
  { n: '01.', title: 'Просто и эффективно', text: 'Наше приложение объединяет удобство и мощный функционал: создавайте задачи, отмечайте выполненные и управляйте своим временем.' },
  { n: '02.', title: 'Умный трекинг', text: 'Система отслеживания помогает видеть прогресс, контролировать привычки и структурировать дела в одном месте.' },
  { n: '03.', title: 'Современный дизайн', text: 'Интерфейс, который одинаково комфортно работает на любом устройстве — понятно, аккуратно и приятно для глаз.' },
  { n: '04.', title: 'Персональные настройки', text: 'Гибкие фильтры, напоминания и приоритеты — настройте приложение так, как удобно именно вам.' },
]

export default function AboutPage() {
  return (
    <div className="pt-8">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="mx-auto max-w-sm">
          <p className="text-sm leading-relaxed">
            Наше приложение помогает организовать задачи, следить за прогрессом и достигать целей каждый день — легко, удобно и без лишнего хаоса.
          </p>
          <Link to="/" className="btn-outline mt-6 inline-block px-6">Перейти к задачам</Link>
        </div>
        <img src={illustration} alt="Иллюстрация: планирование задач" className="mx-auto w-full max-w-md" />
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-brand">Наши ценности</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-gray-700">
          Коротко и ясно о том, что делает наше приложение удобным, полезным и незаменимым для вашего ежедневного планирования.
        </p>
      </section>

      <section className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v) => (
          <div key={v.n}>
            <p className="text-4xl font-bold">{v.n}</p>
            <h3 className="mt-2 text-sm font-semibold">{v.title}</h3>
            <p className="mt-1 text-xs text-gray-700">{v.text}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
