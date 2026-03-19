import { verifyToken } from '@/lib/auth'
import { getHero, updateHero } from '@/lib/services/hero'

function verifyAuth(req) {
  const token = req.cookies['auth-token']
  if (!token) return false
  return verifyToken(token) !== null
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const hero = await getHero()
      return res.status(200).json(hero || {})
    }

    if (!verifyAuth(req)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'PUT') {
      await updateHero(req.body)
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('API Error /api/hero:', error)
    return res.status(500).json({ error: 'Server error', details: error.message })
  }
}
