import multer from 'multer'
import path from 'path'
import fs from 'fs'
import os from 'os'
import { verifyToken } from '@/lib/auth'
import { saveImage } from '@/lib/services/images'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const isProduction = process.env.NODE_ENV === 'production'
const uploadDir = isProduction ? os.tmpdir() : path.join(process.cwd(), 'public', 'images', 'uploads')

if (!isProduction && !fs.existsSync(uploadDir)) {
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
      req.files.map(async (file) => {
        let resultPath = `/images/uploads/${file.filename}`
        let thumbnailUrl = ''

        // Cloudinary Upload if credentials exist
        if (process.env.CLOUDINARY_CLOUD_NAME) {
          try {
            const uploadResult = await cloudinary.uploader.upload(file.path, {
              folder: 'portfolio/projects',
            })
            resultPath = uploadResult.secure_url
            // Optional: delete from local after upload
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path)
          } catch (err) {
            console.error('Cloudinary upload error:', err)
            // Continue with local path if Cloudinary fails
          }
        }

        return await saveImage({
          originalName: file.originalname,
          filename: file.filename,
          path: resultPath,
          size: file.size,
          mimetype: file.mimetype,
          alt: file.originalname.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        })
      })
    )
    return res.status(200).json({ success: true, message: `${saved.length} image(s) uploaded successfully`, files: saved })
  } catch (err) {
    console.error('Image save error:', err)
    return res.status(500).json({ error: 'Failed to save image metadata: ' + err.message })
  }
}

export const config = {
  api: { bodyParser: false },
}
