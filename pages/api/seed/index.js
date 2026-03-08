import path from 'path'
import { readFileSync } from 'fs'
import { verifyToken } from '@/lib/auth'
import clientPromise from '@/lib/db/mongodb'
import { skillsSeedData } from '@/data/seedData'

async function getCollection(name) {
  const client = await clientPromise
  return client.db('portfolio').collection(name)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = req.cookies?.['auth-token']
  const user = token ? verifyToken(token) : null
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { type = 'both', force = false } = req.body || {}
  const results = {}

  try {
    if (type === 'skills' || type === 'both') {
      const col = await getCollection('skills')
      const existing = await col.countDocuments()

      if (existing > 0 && !force) {
        results.skills = { skipped: true, reason: `${existing} skills already exist. Use force=true to overwrite.` }
      } else {
        if (force) await col.deleteMany({})
        const docs = skillsSeedData.map((s) => ({ ...s, createdAt: new Date() }))
        const r = await col.insertMany(docs)
        results.skills = { inserted: r.insertedCount }
      }
    }

    if (type === 'projects' || type === 'both') {
      const col = await getCollection('projects')
      const existing = await col.countDocuments()

      if (existing > 0 && !force) {
        results.projects = { skipped: true, reason: `${existing} projects already exist. Use force=true to overwrite.` }
      } else {
        const jsonPath = path.join(process.cwd(), 'public', 'projectsData.json')
        const raw = readFileSync(jsonPath, 'utf-8')
        const projectsData = JSON.parse(raw)

        if (force) await col.deleteMany({})
        // Strip static `id` field; use MongoDB _id instead
        const docs = projectsData.map(({ id, ...rest }) => ({
          ...rest,
          createdAt: new Date(),
        }))
        const r = await col.insertMany(docs)
        results.projects = { inserted: r.insertedCount }
      }
    }

    return res.status(200).json({ success: true, results })
  } catch (err) {
    console.error('Seed error:', err)
    return res.status(500).json({ error: 'Seeding failed', details: err.message })
  }
}
