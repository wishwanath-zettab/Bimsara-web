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
    cb(null, `team-${Date.now()}${ext}`)
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
  const members = db.prepare('SELECT * FROM team_members ORDER BY sort_order ASC, id ASC').all()
  res.json(members)
})

router.post('/', requireAuth, upload.single('image'), (req, res) => {
  const { name, position, quote, description, description2, linkedin_url } = req.body
  if (!name) return res.status(400).json({ error: 'Name required' })

  const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM team_members').get()
  const sortOrder = (maxOrder.max ?? -1) + 1
  const image = req.file ? req.file.filename : ''

  const result = db.prepare(
    'INSERT INTO team_members (name, position, quote, description, description2, image, linkedin_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(name, position || '', quote || '', description || '', description2 || '', image, linkedin_url || '', sortOrder)

  const member = db.prepare('SELECT * FROM team_members WHERE id = ?').get(result.lastInsertRowid)
  res.status(201).json(member)
})

router.put('/:id', requireAuth, upload.single('image'), (req, res) => {
  const { id } = req.params
  const existing = db.prepare('SELECT * FROM team_members WHERE id = ?').get(id)
  if (!existing) return res.status(404).json({ error: 'Member not found' })

  const name = req.body.name ?? existing.name
  const position = req.body.position ?? existing.position
  const quote = req.body.quote ?? existing.quote
  const description = req.body.description ?? existing.description
  const description2 = req.body.description2 ?? existing.description2
  const linkedin_url = req.body.linkedin_url ?? existing.linkedin_url
  const sortOrder = req.body.sort_order != null ? Number(req.body.sort_order) : existing.sort_order

  let image = existing.image
  if (req.file) {
    // Delete old image file (but not default seeded images that other members might share)
    if (existing.image && existing.image.startsWith('team-')) {
      const oldPath = path.join(uploadsDir, existing.image)
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
    }
    image = req.file.filename
  }

  db.prepare(
    'UPDATE team_members SET name = ?, position = ?, quote = ?, description = ?, description2 = ?, image = ?, linkedin_url = ?, sort_order = ? WHERE id = ?'
  ).run(name, position, quote, description, description2, image, linkedin_url, sortOrder, id)

  const updated = db.prepare('SELECT * FROM team_members WHERE id = ?').get(id)
  res.json(updated)
})

router.delete('/:id', requireAuth, (req, res) => {
  const { id } = req.params
  const existing = db.prepare('SELECT * FROM team_members WHERE id = ?').get(id)
  if (!existing) return res.status(404).json({ error: 'Member not found' })

  // Delete image file if it's a custom upload
  if (existing.image && existing.image.startsWith('team-')) {
    const filePath = path.join(uploadsDir, existing.image)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  }

  db.prepare('DELETE FROM team_members WHERE id = ?').run(id)
  res.json({ ok: true })
})

export default router
