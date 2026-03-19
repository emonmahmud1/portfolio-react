'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Upload, Trash2, Copy, Check, ImageIcon, X, Loader2, FolderOpen } from 'lucide-react'
import { toast } from 'sonner'

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function ImagesManager() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [pendingFiles, setPendingFiles] = useState([]) // preview before upload
  const fileInputRef = useRef(null)

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch('/api/images')
      if (res.ok) setImages(await res.json())
    } catch {
      toast.error('Failed to load images')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchImages() }, [fetchImages])

  const handleFiles = (files) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    const valid = Array.from(files).filter((f) => {
      if (!allowed.includes(f.type)) {
        toast.error(`${f.name}: not a supported image type`)
        return false
      }
      if (f.size > 10 * 1024 * 1024) {
        toast.error(`${f.name}: exceeds 10 MB limit`)
        return false
      }
      return true
    })
    if (valid.length === 0) return
    // Build preview objects
    const previews = valid.map((f) => ({
      file: f,
      name: f.name,
      size: f.size,
      preview: URL.createObjectURL(f),
    }))
    setPendingFiles(prev => [...prev, ...previews])
    toast.info(`${previews.length} image(s) added to preview`)
  }

  const removePending = (idx) => {
    setPendingFiles((prev) => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const handleUpload = async () => {
    if (pendingFiles.length === 0) return
    const formData = new FormData()
    pendingFiles.forEach(({ file }) => formData.append('files', file))

    setUploading(true)
    setProgress(0)

    try {
      const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/upload/image')
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100))
        }
        xhr.onload = () => {
          try {
            const data = JSON.parse(xhr.responseText)
            if (xhr.status === 200 && data.success) {
              resolve(data)
            } else {
              reject(new Error(data.error || 'Upload failed'))
            }
          } catch {
            reject(new Error('Upload failed'))
          }
        }
        xhr.onerror = () => reject(new Error('Network error during upload'))
        xhr.send(formData)
      })

      toast.promise(promise, {
        loading: `Uploading ${pendingFiles.length} image(s)...`,
        success: (data) => data.message || 'Images uploaded successfully!',
        error: (err) => err.message,
      })

      await promise
      pendingFiles.forEach(({ preview }) => URL.revokeObjectURL(preview))
      setPendingFiles([])
      fetchImages()
    } catch (err) {
      // handled by toast.promise
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this image permanently?')) return
    try {
      const res = await fetch(`/api/images?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok && data.success) {
        setImages((prev) => prev.filter((img) => img._id !== id))
        toast.success(data.message || 'Image deleted')
      } else {
        toast.error(data.error || 'Delete failed')
      }
    } catch {
      toast.error('Network error')
    }
  }

  const copyPath = (id, imgPath) => {
    navigator.clipboard.writeText(imgPath)
    setCopiedId(id)
    toast.success('Path copied to clipboard!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Image Library</h2>
        <p className="text-gray-500 text-sm mt-1">Upload and manage images for your projects and portfolio.</p>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50'
        } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Upload className="mx-auto mb-2 text-gray-400" size={32} />
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-blue-600">Click to browse</span> or drag & drop images here
        </p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP, GIF, SVG — max 10 MB each — multiple files allowed</p>
      </div>

      {/* Pending preview */}
      {pendingFiles.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">{pendingFiles.length} file{pendingFiles.length > 1 ? 's' : ''} ready to upload</p>
            {!uploading && (
              <button 
                onClick={() => { pendingFiles.forEach(({ preview }) => URL.revokeObjectURL(preview)); setPendingFiles([]); toast.info('Queue cleared') }}
                className="text-xs text-red-500 hover:underline"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {pendingFiles.map((pf, idx) => (
              <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200">
                <img src={pf.preview} alt={pf.name} className="w-full h-24 object-cover" />
                {!uploading && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removePending(idx) }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1 truncate">
                  {formatBytes(pf.size)}
                </div>
              </div>
            ))}
          </div>

          {uploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Uploading…</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {uploading ? 'Uploading…' : 'Upload Now'}
            </button>
            {!uploading && (
              <button
                onClick={() => { pendingFiles.forEach(({ preview }) => URL.revokeObjectURL(preview)); setPendingFiles([]) }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* Gallery */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Uploaded Images {!loading && `(${images.length})`}
        </h3>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-video bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <FolderOpen size={40} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No images uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img._id} className="group relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={img.path}
                    alt={img.alt || img.originalName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-300"><svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'1.5\'><rect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\'/><circle cx=\'8.5\' cy=\'8.5\' r=\'1.5\'/><path d=\'m21 15-5-5L5 21\'/></svg></div>'
                    }}
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-600 truncate" title={img.originalName}>{img.originalName}</p>
                  <p className="text-xs text-gray-400">{formatBytes(img.size)}</p>
                  <div className="font-mono text-xs text-blue-700 bg-blue-50 rounded px-1.5 py-0.5 mt-1 truncate" title={img.path}>
                    {img.path}
                  </div>
                  <div className="flex gap-1 mt-2">
                    <button
                      onClick={() => copyPath(img._id, img.path)}
                      title="Copy path"
                      className={`flex items-center gap-1 flex-1 justify-center py-1 rounded text-xs font-medium transition-colors ${
                        copiedId === img._id
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                      }`}
                    >
                      {copiedId === img._id ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy path</>}
                    </button>
                    <button
                      onClick={() => handleDelete(img._id)}
                      title="Delete image"
                      className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
