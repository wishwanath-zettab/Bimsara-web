import express from 'express'
import session from 'express-session'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import db from './db.js'
import authRoutes from './routes/auth.js'
import settingsRoutes from './routes/settings.js'
import contactsRoutes from './routes/contacts.js'
import providersRoutes from './routes/providers.js'
import teamRoutes from './routes/team.js'
import uploadRoutes from './routes/upload.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3001
const isProduction = process.env.NODE_ENV === 'production'

const app = express()

// Middleware
app.use(cors({
  origin: isProduction ? false : 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET || 'bimsara-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set true behind HTTPS in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}))

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/contacts', contactsRoutes)
app.use('/api/providers', providersRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/upload', uploadRoutes)

// Combined public data endpoint
app.get('/api/site-data', (req, res) => {
  // Settings
  const settingsRows = db.prepare('SELECT key, value FROM settings').all()
  const settings = {}
  for (const row of settingsRows) {
    settings[row.key] = row.value
  }
  if (settings.teamPositions) settings.teamPositions = Number(settings.teamPositions)
  if (settings.serviceProviderCount) settings.serviceProviderCount = Number(settings.serviceProviderCount)

  // Contacts
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY sort_order ASC, id ASC').all()

  // Service providers
  const serviceProviders = db.prepare('SELECT * FROM service_providers ORDER BY sort_order ASC, id ASC').all()

  // Team members
  const teamMembers = db.prepare('SELECT * FROM team_members ORDER BY sort_order ASC, id ASC').all()

  res.json({
    ...settings,
    contacts,
    serviceProviders,
    teamMembers,
  })
})

// Production: serve Vite build
if (isProduction) {
  const distPath = path.join(__dirname, '..', 'dist')
  app.use(express.static(distPath))
  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
