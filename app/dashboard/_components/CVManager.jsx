'use client'

import { useState, useEffect, useRef } from 'react'
import { Upload, Trash2, FileText, Download, CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react'

function formatBytes(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function CVManager() {
  const [cvFiles, setCvFiles] = useState([])
  const [label, setLabel] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null) // { type: 'success'|'error', message }
  const [progress, setProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchCVFiles()
  }, [])

  const fetchCVFiles = async () => {
    const res = await fetch('/api/cv')
    if (res.ok) {
      const data = await res.json()
      setCvFiles(Array.isArray(data) ? data : [])
    }
  }

  const handleFilePick = (picked) => {
    if (!picked) return
    if (picked.type !== 'application/pdf') {
      setUploadStatus({ type: 'error', message: 'Only PDF files are allowed' })
      return
    }
    if (picked.size > 5 * 1024 * 1024) {
      setUploadStatus({ type: 'error', message: 'File size must be under 5MB' })
      return
    }
    setFile(picked)
    setUploadStatus(null)
    // Auto-fill label from filename if empty
    if (!label.trim()) {
      setLabel(picked.name.replace(/\.pdf$/i, '').replace(/[_-]/g, ' '))
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFilePick(dropped)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) {
      setUploadStatus({ type: 'error', message: 'Please select a PDF file' })
      return
    }
    if (!label.trim()) {
      setUploadStatus({ type: 'error', message: 'Please enter a label for this CV' })
      return
    }

    setUploading(true)
    setProgress(0)
    setUploadStatus(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('label', label.trim())

    try {
      // Simulate progress with XHR for better UX
      const result = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100))
          }
        })
        xhr.addEventListener('load', () => {
          try {
            resolve({ ok: xhr.status < 400, data: JSON.parse(xhr.responseText) })
          } catch {
            reject(new Error('Upload failed'))
          }
        })
        xhr.addEventListener('error', () => reject(new Error('Network error')))
        xhr.open('POST', '/api/upload/cv')
        xhr.send(formData)
      })

      if (result.ok) {
        setUploadStatus({ type: 'success', message: `"${label.trim()}" uploaded successfully and added to your CV links!` })
        setFile(null)
        setLabel('')
        setProgress(0)
        if (fileInputRef.current) fileInputRef.current.value = ''
        fetchCVFiles()
      } else {
        setUploadStatus({ type: 'error', message: result.data?.error || 'Upload failed' })
      }
    } catch (err) {
      setUploadStatus({ type: 'error', message: err.message || 'Upload failed' })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This will also remove it from your CV download links.`)) return
    const res = await fetch('/api/cv', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) fetchCVFiles()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">CV / Resume Files</h2>
        <p className="text-gray-500 text-sm mt-1">
          Upload PDF files from your device. Uploaded files are automatically added to your portfolio&apos;s CV download dropdown.
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Upload className="w-4 h-4 text-gray-500" />
            Upload New CV
          </h3>
        </div>

        <form onSubmit={handleUpload} className="p-6 space-y-4">
          {/* Status Messages */}
          {uploadStatus && (
            <div className={`flex items-start gap-3 p-3 rounded-lg ${
              uploadStatus.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {uploadStatus.type === 'success'
                ? <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                : <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              }
              <span className="text-sm">{uploadStatus.message}</span>
              <button type="button" onClick={() => setUploadStatus(null)} className="ml-auto flex-shrink-0 opacity-60 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Label <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Developer CV  /  SQA Engineer CV"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              maxLength={100}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-400 mt-1">This label appears in the CV dropdown on your portfolio</p>
          </div>

          {/* File Drop Zone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              PDF File <span className="text-red-400">*</span>
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                dragOver
                  ? 'border-gray-900 bg-gray-50'
                  : file
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => handleFilePick(e.target.files[0])}
              />

              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFile(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                    className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {dragOver ? 'Drop your PDF here' : 'Drag & drop or click to select'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PDF only · Max 5MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gray-900 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={uploading || !file}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
            ) : (
              <><Upload className="w-4 h-4" /> Upload CV</>
            )}
          </button>
        </form>
      </div>

      {/* Files List */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Uploaded Files</h3>
          <span className="text-sm text-gray-500">{cvFiles.length} file{cvFiles.length !== 1 ? 's' : ''}</span>
        </div>

        {cvFiles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium text-sm">No files uploaded yet</p>
            <p className="text-gray-400 text-xs mt-1">Upload your first CV above</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {cvFiles.map((cv) => (
              <li key={cv._id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                {/* Icon */}
                <div className="w-9 h-9 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-red-500" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{cv.label}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{cv.originalName}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">{formatBytes(cv.size)}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{formatDate(cv.uploadedAt)}</span>
                    <span className="text-gray-300">·</span>
                    <code className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{cv.path}</code>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href={cv.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-300 rounded-lg transition-colors"
                    title="View PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(cv._id, cv.label)}
                    className="p-2 border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-300 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
