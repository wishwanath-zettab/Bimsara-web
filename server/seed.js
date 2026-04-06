import db from './db.js'
import bcrypt from 'bcrypt'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = path.join(__dirname, 'uploads')
const assetsDir = path.join(__dirname, '..', 'src', 'assets', 'images')

// Ensure uploads dir exists
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

// Read defaults
const defaults = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'site-data.json'), 'utf-8')
)

// --- Settings ---
const settingsData = {
  teamPositions: String(defaults.teamPositions),
  serviceProviderCount: String(defaults.serviceProviderCount),
  officeAddress: defaults.officeAddress || '',
  commissionRate: defaults.commissionRate || '',
  isoCertificateImage: '', // empty = use default
}

const upsertSetting = db.prepare(
  'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
)
for (const [key, value] of Object.entries(settingsData)) {
  upsertSetting.run(key, value)
}
console.log('Settings seeded.')

// --- Contacts ---
const existingContacts = db.prepare('SELECT COUNT(*) as count FROM contacts').get()
if (existingContacts.count === 0) {
  const insertContact = db.prepare(
    'INSERT INTO contacts (category, email, phone, sort_order) VALUES (?, ?, ?, ?)'
  )
  defaults.contacts.forEach((c, i) => {
    insertContact.run(c.category, c.email, c.phone, i)
  })
  console.log('Contacts seeded.')
} else {
  console.log('Contacts already exist, skipping.')
}

// --- Service Providers ---
const existingProviders = db.prepare('SELECT COUNT(*) as count FROM service_providers').get()
if (existingProviders.count === 0) {
  const insertProvider = db.prepare(
    'INSERT INTO service_providers (name, logo, sort_order) VALUES (?, ?, ?)'
  )
  defaults.serviceProviders.forEach((sp, i) => {
    // Copy logo file to uploads if it exists
    let logoFile = ''
    if (sp.logo) {
      const src = path.join(assetsDir, sp.logo)
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(uploadsDir, sp.logo))
        logoFile = sp.logo
      }
    }
    insertProvider.run(sp.name, logoFile, i)
  })
  console.log('Service providers seeded.')
} else {
  console.log('Service providers already exist, skipping.')
}

// --- Team Members ---
const teamMembersData = [
  {
    name: 'Bimsara Gamage',
    position: 'Managing Director/ CEO',
    quote: '\u201cAlthough we are in the service provider business, I always visualize our operation similar to a production process in the manufacturing industry that runs on a conveyor belt system. The seamless flow of perfect coordination between departments ensuring efficiency with stringent quality checks at all points, I believe, is the greatest strength we have built as a team now.\u201d',
    description: 'Bimsara counts over 20 years of experience involving hundreds of Real Estate mediation as a licensed broker and an auctioneer. His initial entry was as an investor and a developer and that involvement has made him conversant with all legal procedures as well as local authority and UDA regulations.',
    description2: 'Bimsara has been tested in many environments for honesty and integrity and the testimonials issued by his real estate clients speak volumes of Bimsara\u2019s ability, capacity, passion and his uncompromising commitment to rise to the top in the real estate business.',
    image: 'member-1.png',
    linkedin_url: 'https://www.linkedin.com/in/bimsara-b-gamage-5b0b832a/',
  },
  {
    name: 'Vinuri Liyanagamage',
    position: 'Head of Operations',
    quote: '\u201cI see the company as far more than a real estate broker but is a responsible and ethical body that is well specialized in treating the data right with the intention of producing the right outcome.\u201d',
    description: 'Vinuri works towards achieving company objectives by overseeing all operations, managing people, implementing tech solutions and it doesn\u2019t end there!',
    description2: 'She relentlessly dedicated her time in studying the business processes of this unique industry to re-engineer the processes & better serve our clients by embracing tech. In her spare time, she enjoys designing UI/UX and of course, the company benefits from her skills in digital designing. Vinuri is obsessed with data management and also ensures it happens across the organization.',
    image: 'member-6.png',
    linkedin_url: 'https://www.linkedin.com/in/vinuri-liyanagamage',
  },
  {
    name: 'Evantha Divulwewa',
    position: 'Manager - Transactions',
    quote: '\u201cI believe that with the quality of work & ethics of the company that are inculcated to a small team, we are delivering a service way above the industry standards. In this backdrop, continuous guidance and our adaptability will enable me to grow my career further and the company to achieve its objectives.\u201d',
    description: 'Evantha is entrusted with the responsibility of a vital phase in the business process; managing and coordinating confirmed sales leading to a successful and efficient close. He is the key facilitator for multiple parties involved in all transactions.',
    description2: 'Although he comes from a different industry having obtained his degree in the Hospitality Trade, with the constant guidance and mentoring, he made a fine and a responsible business manager for the company.',
    image: 'member-5.png',
    linkedin_url: 'https://lk.linkedin.com/in/evantha-divulwewa-b9007690',
  },
  {
    name: 'Punsiri Wijekoon',
    position: 'Field Coordinator',
    quote: '\u201cThe company is a place for self-improvement. I enjoy great benefits and work - life balance here at Safetynet.\u201d',
    description: 'Punsiri is a front-liner of Safetynet (Private) Limited. He facilitates client visits and gets involved in the initial property evaluation and grading.',
    description2: 'He comes with accountancy and procurement experience. Our property procurement process is much influenced by his contribution in helping to better understand the nature and status of the properties strictly maintaining the compliance standards set by the management.',
    image: 'member-4.png',
    linkedin_url: 'https://www.linkedin.com/in/punsiri-wijekoon-745b6579/',
  },
  {
    name: 'Hansi Ranasinghe',
    position: 'Division Manager - Apartments',
    quote: '\u201cThe company has made the brand name by not only analyzing the situations correctly but also timely forecasting the opportunities available with the market trends. The experience gained by handling a property as a project is the best practice a broking company can promote to its employees.\u201d',
    description: 'Hansi comes with hands-on experience and knowledge in sales and marketing. She manages the apartments division overlooking property procurement, marketing activities and sales. Her level of attention to detail serves well in identifying the requirements of the clients to provide them the best solutions while adding value by saving their valuable time.',
    description2: 'Hansi holds a BSc in Industrial Management and Statistics. Currently she is reading for her Masters in Applied Statistics.',
    image: 'member-3.png',
    linkedin_url: 'https://www.linkedin.com/in/hansi-gangadhari-ranasinghe-5968b9163',
  },
  {
    name: 'Nadeesha Weerathunga',
    position: 'Division Manager - Houses',
    quote: '\u201cAiming at Increasing the productivity and establishing the credentials as a Real Estate industry expert by improving the skills and providing better service to the customers.\u201d',
    description: 'Nadeesha manages the houses division overlooking property procurement, marketing activities and sales. She comes with research experience and adds value to each project through that.',
    description2: 'Nadeesha holds BSc(Special) in Agricultural Technology and Management and loves social service. She believes that ongoing practice, reading, reflection, asking for feedback and integrating them into behavior are crucial to become successful in achieving.',
    image: 'member-2.png',
    linkedin_url: 'https://www.linkedin.com/in/nadeesha-weerathunga-8535421a6',
  },
]

const existingMembers = db.prepare('SELECT COUNT(*) as count FROM team_members').get()
if (existingMembers.count === 0) {
  const insertMember = db.prepare(
    'INSERT INTO team_members (name, position, quote, description, description2, image, linkedin_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  )
  teamMembersData.forEach((m, i) => {
    // Copy image to uploads
    const src = path.join(assetsDir, m.image)
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(uploadsDir, m.image))
    }
    insertMember.run(m.name, m.position, m.quote, m.description, m.description2, m.image, m.linkedin_url, i)
  })
  console.log('Team members seeded.')
} else {
  console.log('Team members already exist, skipping.')
}

// --- Admin User ---
const existingAdmin = db.prepare('SELECT COUNT(*) as count FROM admin_users').get()
if (existingAdmin.count === 0) {
  const hash = bcrypt.hashSync('Bimsara@2024', 10)
  db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run('admin', hash)
  console.log('Admin user created (username: admin).')
} else {
  console.log('Admin user already exists, skipping.')
}

// Copy ISO certificate default
const isoCertSrc = path.join(assetsDir, 'iso-certificate.png')
if (fs.existsSync(isoCertSrc) && !fs.existsSync(path.join(uploadsDir, 'iso-certificate.png'))) {
  fs.copyFileSync(isoCertSrc, path.join(uploadsDir, 'iso-certificate.png'))
  console.log('ISO certificate copied to uploads.')
}

console.log('Seed complete.')
