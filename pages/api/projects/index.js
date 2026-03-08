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
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'POST') {
      const id = await createProject(req.body)
      return res.status(201).json({ success: true, id })
    }

    if (req.method === 'PUT') {
      const { _id, ...data } = req.body
      await updateProject(_id, data)
      return res.status(200).json({ success: true })
    }

    if (req.method === 'DELETE') {
      await deleteProject(req.body.id)
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}
