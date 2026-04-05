import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', (req, res) => {
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY sort_order ASC, id ASC').all()
  res.json(contacts)
})

router.post('/', requireAuth, (req, res) => {
  const { category, email, phone } = req.body
  if (!category) return res.status(400).json({ error: 'Category required' })

  const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM contacts').get()
  const sortOrder = (maxOrder.max ?? -1) + 1

  const result = db.prepare(
    'INSERT INTO contacts (category, email, phone, sort_order) VALUES (?, ?, ?, ?)'
  ).run(category, email || '', phone || '', sortOrder)

  const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(result.lastInsertRowid)
  res.status(201).json(contact)
})

router.put('/:id', requireAuth, (req, res) => {
  const { id } = req.params
  const { category, email, phone, sort_order } = req.body

  const existing = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id)
  if (!existing) return res.status(404).json({ error: 'Contact not found' })

  db.prepare(
    'UPDATE contacts SET category = ?, email = ?, phone = ?, sort_order = ? WHERE id = ?'
  ).run(
    category ?? existing.category,
    email ?? existing.email,
    phone ?? existing.phone,
    sort_order ?? existing.sort_order,
    id
  )

  const updated = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id)
  res.json(updated)
})

router.delete('/:id', requireAuth, (req, res) => {
  const { id } = req.params
  const existing = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id)
  if (!existing) return res.status(404).json({ error: 'Contact not found' })

  db.prepare('DELETE FROM contacts WHERE id = ?').run(id)
  res.json({ ok: true })
})

export default router
