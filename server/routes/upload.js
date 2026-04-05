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
    cb(null, `iso-cert-${Date.now()}${ext}`)
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

router.post('/iso-cert', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Image file required' })

  // Delete old custom ISO cert if exists
  const old = db.prepare("SELECT value FROM settings WHERE key = 'isoCertificateImage'").get()
  if (old && old.value && old.value.startsWith('iso-cert-')) {
    const oldPath = path.join(uploadsDir, old.value)
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
  }

  db.prepare(
    "INSERT INTO settings (key, value) VALUES ('isoCertificateImage', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  ).run(req.file.filename)

  res.json({ filename: req.file.filename })
})

router.delete('/iso-cert', requireAuth, (req, res) => {
  const old = db.prepare("SELECT value FROM settings WHERE key = 'isoCertificateImage'").get()
  if (old && old.value && old.value.startsWith('iso-cert-')) {
    const oldPath = path.join(uploadsDir, old.value)
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
  }

  db.prepare(
    "INSERT INTO settings (key, value) VALUES ('isoCertificateImage', '') ON CONFLICT(key) DO UPDATE SET value = ''"
  ).run()

  res.json({ ok: true })
})

export default router
