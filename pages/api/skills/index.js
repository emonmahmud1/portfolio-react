import { verifyToken } from '@/lib/auth'
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/services/skills'

function verifyAuth(req) {
  const token = req.cookies['auth-token']
  if (!token) return false
  return verifyToken(token) !== null
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const skills = await getSkills()
      return res.status(200).json(skills)
    }

    if (!verifyAuth(req)) {
      return res.status(401).json({ error: 'Please login to perform this action' })
    }

    if (req.method === 'POST') {
      const id = await createSkill(req.body)
      return res.status(201).json({ success: true, message: 'Skill added successfully', id })
    }

    if (req.method === 'PUT') {
      const { _id, ...data } = req.body
      await updateSkill(_id, data)
      return res.status(200).json({ success: true, message: 'Skill updated successfully' })
    }

    if (req.method === 'DELETE') {
      await deleteSkill(req.body.id)
      return res.status(200).json({ success: true, message: 'Skill deleted successfully' })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Skills API error:', error)
    return res.status(500).json({ error: 'Internal server error: ' + error.message })
  }
}
