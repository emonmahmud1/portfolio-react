import { verifyToken } from '@/lib/auth'
import { reorderProjects } from '@/lib/services/projects'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = req.cookies['auth-token']
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Please login to perform this action' })
  }

  try {
    const { ids } = req.body
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'Array of Project IDs required' })
    }
    await reorderProjects(ids)
    return res.status(200).json({ success: true, message: 'New order saved successfully' })
  } catch (error) {
    console.error('Reorder API Error:', error)
    return res.status(500).json({ error: 'Internal server error: ' + error.message })
  }
}
