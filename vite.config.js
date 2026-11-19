import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

// Мини-API (замена json-server): /api/tasks читает и пишет src/db.json.
// Работает вместе с `npm run dev`, отдельный сервер не нужен.
function mockApi() {
  const file = path.resolve(import.meta.dirname, 'src/db.json')
  const load = () => {
    try { return JSON.parse(fs.readFileSync(file, 'utf-8')) } catch { return { tasks: [] } }
  }
  const save = (db) => fs.writeFileSync(file, JSON.stringify(db, null, 2))
  const readBody = (req) => new Promise((resolve) => {
    let raw = ''
    req.on('data', (c) => (raw += c))
    req.on('end', () => { try { resolve(JSON.parse(raw || '{}')) } catch { resolve({}) } })
  })

  return {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use('/api/tasks', async (req, res) => {
        const send = (code, data) => {
          res.statusCode = code
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data ?? {}))
        }
        const id = Number((req.url || '/').split('?')[0].split('/').filter(Boolean)[0])
        const db = load()
        db.tasks ??= []
        const idx = Number.isNaN(id) ? -1 : db.tasks.findIndex((t) => t.id === id)

        if (req.method === 'GET') {
          if (Number.isNaN(id)) return send(200, db.tasks)
          return idx < 0 ? send(404) : send(200, db.tasks[idx])
        }
        if (req.method === 'POST') {
          const body = await readBody(req)
          const task = { ...body, id: db.tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1 }
          db.tasks.push(task); save(db)
          return send(201, task)
        }
        if (req.method === 'PATCH' || req.method === 'PUT') {
          if (idx < 0) return send(404)
          db.tasks[idx] = { ...db.tasks[idx], ...(await readBody(req)), id }
          save(db)
          return send(200, db.tasks[idx])
        }
        if (req.method === 'DELETE') {
          if (idx < 0) return send(404)
          db.tasks.splice(idx, 1); save(db)
          return send(200)
        }
        send(405)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), mockApi()],
})
