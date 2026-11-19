import axios from 'axios'

// Запросы идут на /api/* — их обрабатывает мини-API в vite.config.js
const api = axios.create({ baseURL: '/api' })

export default api
