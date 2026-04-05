import { Router } from 'express'
import bcrypt from 'bcrypt'
import db from '../db.js'

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username)
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  req.session.user = { id: user.id, username: user.username }
  res.json({ ok: true })
})

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.json({ ok: true })
  })
})

router.get('/check', (req, res) => {
  res.json({ authenticated: !!(req.session && req.session.user) })
})

export default router
