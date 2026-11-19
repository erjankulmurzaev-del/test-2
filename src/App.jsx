import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import TaskDetailPage from './pages/TaskDetailPage.jsx'
import Header from './companets/Header.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={2500} />
    </BrowserRouter>
  )
}
