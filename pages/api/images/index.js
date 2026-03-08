import path from 'path'
import fs from 'fs'
import { verifyToken } from '@/lib/auth'
import { getImages, deleteImage, getImageById } from '@/lib/services/images'

export default async function handler(req, res) {
  const token = req.cookies?.['auth-token']
  const user = token ? verifyToken(token) : null
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      const images = await getImages()
      return res.status(200).json(images)
    } catch (err) {
      console.error('Get images error:', err)
      return res.status(500).json({ error: 'Failed to fetch images' })
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'Missing id' })

    try {
      const image = await getImageById(id)
      if (!image) return res.status(404).json({ error: 'Image not found' })

      // Safe path construction — only use basename to prevent path traversal
      const filename = path.basename(image.filename)
      const filePath = path.join(process.cwd(), 'public', 'images', 'uploads', filename)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }

      await deleteImage(id)
      return res.status(200).json({ success: true })
    } catch (err) {
      console.error('Delete image error:', err)
      return res.status(500).json({ error: 'Failed to delete image' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
