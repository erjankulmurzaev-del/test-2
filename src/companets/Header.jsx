import { NavLink } from 'react-router-dom'


export default function Header() {
  const link = ({ isActive }) =>
    `px-1 pb-0.5 text-xs ${isActive ? 'border-b border-brand text-black' : 'text-gray-700 hover:text-black'}`
  return (
    <header className="py-4">
      <nav className="flex items-center justify-center gap-8">
        <NavLink to="/" end className={link}>Task Manager</NavLink>
        <NavLink to="/about" className={link}>О приложении</NavLink>
      </nav>
    </header>
  )
}

