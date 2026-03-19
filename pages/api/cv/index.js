import path from 'path'
import fs from 'fs'
import { verifyToken } from '@/lib/auth'
import { getCVFiles, getCVById, deleteCVFile } from '@/lib/services/cv'
import { getHero, updateHero } from '@/lib/services/hero'

function verifyAuth(req) {
  const token = req.cookies?.['auth-token']
  if (!token) return false
  return verifyToken(token) !== null
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const files = await getCVFiles()
      return res.status(200).json(files)
    }

    if (!verifyAuth(req)) {
      return res.status(401).json({ error: 'Please login to perform this action' })
    }

    if (req.method === 'DELETE') {
      const { id } = req.body
      if (!id) return res.status(400).json({ error: 'Missing CV ID' })

      const cv = await getCVById(id)

      if (cv) {
        // Only attempt local delete if it's a relative path
        if (cv.path.startsWith('/cv/') && !cv.path.startsWith('http')) {
          const safeName = path.basename(cv.filename)
          const filePath = path.join(process.cwd(), 'public', 'cv', safeName)
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
          }
        }

        await deleteCVFile(id)

        // Auto-sync: remove this CV from hero's cvOptions
        try {
          const hero = await getHero()
          if (hero?.cvOptions) {
            const updated = hero.cvOptions.filter((opt) => opt.file !== cv.path)
            await updateHero({ ...hero, cvOptions: updated })
          }
        } catch {
          // Non-fatal
        }
      }

      return res.status(200).json({ success: true, message: 'CV deleted successfully' })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('CV sync delete error:', error)
    return res.status(500).json({ error: 'Internal server error: ' + error.message })
  }
}
