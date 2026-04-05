import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM settings').all()
  const settings = {}
  for (const row of rows) {
    settings[row.key] = row.value
  }
  // Cast numeric fields
  if (settings.teamPositions) settings.teamPositions = Number(settings.teamPositions)
  if (settings.serviceProviderCount) settings.serviceProviderCount = Number(settings.serviceProviderCount)
  res.json(settings)
})

router.put('/', requireAuth, (req, res) => {
  const updates = req.body
  if (!updates || typeof updates !== 'object') {
    return res.status(400).json({ error: 'Request body must be an object' })
  }

  const upsert = db.prepare(
    'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
  )

  const runAll = db.transaction((entries) => {
    for (const [key, value] of entries) {
      upsert.run(key, String(value))
    }
  })

  runAll(Object.entries(updates))
  res.json({ ok: true })
})

export default router
