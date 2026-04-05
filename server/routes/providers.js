import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = path.join(__dirname, '..', 'uploads')

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `provider-${Date.now()}${ext}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files allowed'))
  },
})

const router = Router()

router.get('/', (req, res) => {
  const providers = db.prepare('SELECT * FROM service_providers ORDER BY sort_order ASC, id ASC').all()
  res.json(providers)
})

router.post('/', requireAuth, upload.single('logo'), (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Name required' })

  const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM service_providers').get()
  const sortOrder = (maxOrder.max ?? -1) + 1
  const logo = req.file ? req.file.filename : ''

  const result = db.prepare(
    'INSERT INTO service_providers (name, logo, sort_order) VALUES (?, ?, ?)'
  ).run(name, logo, sortOrder)

  const provider = db.prepare('SELECT * FROM service_providers WHERE id = ?').get(result.lastInsertRowid)
  res.status(201).json(provider)
})

router.put('/:id', requireAuth, upload.single('logo'), (req, res) => {
  const { id } = req.params
  const existing = db.prepare('SELECT * FROM service_providers WHERE id = ?').get(id)
  if (!existing) return res.status(404).json({ error: 'Provider not found' })

  const name = req.body.name ?? existing.name
  const sortOrder = req.body.sort_order != null ? Number(req.body.sort_order) : existing.sort_order

  let logo = existing.logo
  if (req.file) {
    // Delete old logo file
    if (existing.logo) {
      const oldPath = path.join(uploadsDir, existing.logo)
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
    }
    logo = req.file.filename
  }

  db.prepare(
    'UPDATE service_providers SET name = ?, logo = ?, sort_order = ? WHERE id = ?'
  ).run(name, logo, sortOrder, id)

  const updated = db.prepare('SELECT * FROM service_providers WHERE id = ?').get(id)
  res.json(updated)
})

router.delete('/:id', requireAuth, (req, res) => {
  const { id } = req.params
  const existing = db.prepare('SELECT * FROM service_providers WHERE id = ?').get(id)
  if (!existing) return res.status(404).json({ error: 'Provider not found' })

  // Delete logo file
  if (existing.logo) {
    const filePath = path.join(uploadsDir, existing.logo)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  }

  db.prepare('DELETE FROM service_providers WHERE id = ?').run(id)
  res.json({ ok: true })
})

export default router
