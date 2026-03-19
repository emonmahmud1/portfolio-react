import multer from 'multer'
import path from 'path'
import fs from 'fs'
import os from 'os'
import { verifyToken } from '@/lib/auth'
import { saveCVFile } from '@/lib/services/cv'
import { getHero, updateHero } from '@/lib/services/hero'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Ensure upload directory exists
const isProduction = process.env.NODE_ENV === 'production'
const uploadDir = isProduction ? os.tmpdir() : path.join(process.cwd(), 'public', 'cv')

if (!isProduction && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_')
    cb(null, `${base}_${Date.now()}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Only PDF files are allowed'))
  },
})

function runMulter(req, res) {
  return new Promise((resolve, reject) => {
    upload.single('file')(req, res, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = req.cookies?.['auth-token']
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    await runMulter(req, res)

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const ext = path.extname(req.file.originalname)
    const rawLabel = req.body?.label || path.basename(req.file.originalname, ext)
    // Sanitize label — strip HTML/script injection
    const label = rawLabel.replace(/<[^>]*>/g, '').trim().slice(0, 100)
    
    let filePath = '/cv/' + req.file.filename

    // Cloudinary Upload if credentials exist
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: 'portfolio/cv',
          resource_type: 'raw',
        })
        filePath = uploadResult.secure_url
        // Optional: delete from local after upload
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path)
      } catch (err) {
        console.error('Cloudinary CV upload error:', err)
      }
    }

    // Save metadata to MongoDB
    const id = await saveCVFile({
      label,
      filename: req.file.filename,
      path: filePath,
      originalName: req.file.originalname,
      size: req.file.size,
      uploadedAt: new Date(),
    })

    // Auto-sync: add this CV to hero's cvOptions
    try {
      const hero = await getHero()
      const existing = hero?.cvOptions || []
      const updated = [...existing, { label, file: filePath }]
      await updateHero({ ...(hero || {}), cvOptions: updated })
    } catch {
      // Non-fatal: hero sync failure shouldn't fail the upload
    }

    return res.status(200).json({
      success: true,
      message: 'CV uploaded and synced with hero section',
      id: id.toString(),
      label,
      path: filePath,
      filename: req.file.filename,
      size: req.file.size,
    })
  } catch (err) {
    console.error('CV upload error:', err)
    return res.status(400).json({ error: err.message || 'Upload failed' })
  }
}
