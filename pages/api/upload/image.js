import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { verifyToken } from '@/lib/auth'
import { saveImage } from '@/lib/services/images'

const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_SIZE_MB = 10

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${unique}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed (jpg, png, webp, gif, svg)'))
    }
  },
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) reject(result)
      else resolve(result)
    })
  })
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

  try {
    await runMiddleware(req, res, upload.array('files', 20))
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' })
  }

  try {
    const saved = await Promise.all(
      req.files.map((file) =>
        saveImage({
          originalName: file.originalname,
          filename: file.filename,
          path: `/images/uploads/${file.filename}`,
          size: file.size,
          mimetype: file.mimetype,
          alt: file.originalname.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        })
      )
    )
    return res.status(200).json({ success: true, files: saved })
  } catch (err) {
    console.error('Image save error:', err)
    return res.status(500).json({ error: 'Failed to save image metadata' })
  }
}

export const config = {
  api: { bodyParser: false },
}
