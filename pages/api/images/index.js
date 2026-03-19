import path from 'path'
import fs from 'fs'
import { verifyToken } from '@/lib/auth'
import { getImages, deleteImage, getImageById } from '@/lib/services/images'

export default async function handler(req, res) {
  try {
    const token = req.cookies?.['auth-token']
    const user = token ? verifyToken(token) : null
    
    if (req.method === 'GET') {
      const images = await getImages()
      return res.status(200).json(images)
    }

    if (!user) {
      return res.status(401).json({ error: 'Please login to perform this action' })
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      if (!id) return res.status(400).json({ error: 'Missing Image ID' })

      const image = await getImageById(id)
      if (!image) return res.status(404).json({ error: 'Image not found' })

      // Safe path construction — only use basename to prevent path traversal
      const filename = path.basename(image.filename)
      const filePath = path.join(process.cwd(), 'public', 'images', 'uploads', filename)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }

      await deleteImage(id)
      return res.status(200).json({ success: true, message: 'Image deleted successfully' })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('Images API error:', err)
    return res.status(500).json({ error: 'Internal server error: ' + err.message })
  }
}
