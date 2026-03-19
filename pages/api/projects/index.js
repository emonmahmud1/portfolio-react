import { verifyToken } from '@/lib/auth'
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/services/projects'

function verifyAuth(req) {
  const token = req.cookies['auth-token']
  if (!token) return false
  return verifyToken(token) !== null
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const projects = await getProjects()
      return res.status(200).json(projects)
    }

    if (!verifyAuth(req)) {
      return res.status(401).json({ error: 'Please login to perform this action' })
    }

    if (req.method === 'POST') {
      const id = await createProject(req.body)
      return res.status(201).json({ success: true, message: 'Project created successfully', id })
    }

    if (req.method === 'PUT') {
      const { _id, ...data } = req.body
      await updateProject(_id, data)
      return res.status(200).json({ success: true, message: 'Project updated successfully' })
    }

    if (req.method === 'DELETE') {
      await deleteProject(req.body.id)
      return res.status(200).json({ success: true, message: 'Project deleted successfully' })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Projects API error:', error)
    return res.status(500).json({ error: 'Internal server error: ' + error.message })
  }
}
