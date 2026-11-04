import { useRef, useState } from 'react'
import { Camera, ImagePlus, Upload } from 'lucide-react'
import CameraCapture from './CameraCapture.jsx'
import Alert from './Alert.jsx'

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']
const MAX_MB = 10

export function validatePhotoFile(file) {
  if (!file) return 'No file selected.'
  if (!ACCEPTED.includes(file.type)) {
    return 'Please choose a JPG, PNG or WEBP image. (iPhone HEIC photos: export as JPG first.)'
  }
  if (file.size > MAX_MB * 1024 * 1024) return `That image is larger than ${MAX_MB} MB. Please choose a smaller one.`
  return null
}

export default function PhotoInput({ onPhoto }) {
  const [mode, setMode] = useState('upload')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleFile = (file) => {
    const problem = validatePhotoFile(file)
    if (problem) {
      setError(problem)
      return
    }
    setError('')
    onPhoto(file, 'upload')
  }

  return (
    <div>
      <div className="mb-4 inline-flex rounded-full bg-blush-50 p-1" role="tablist">
        {[
          { key: 'upload', label: 'Upload photo', icon: Upload },
          { key: 'camera', label: 'Use camera', icon: Camera },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mode === key}
            onClick={() => {
              setMode(key)
              setError('')
            }}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition cursor-pointer ${
              mode === key ? 'bg-white shadow-sm' : 'text-ink/60 hover:text-ink'
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      {mode === 'upload' ? (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              handleFile(e.dataTransfer.files?.[0])
            }}
            className={`flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition cursor-pointer ${
              dragging ? 'border-blush-500 bg-blush-50' : 'border-ink/15 hover:border-blush-400 hover:bg-blush-50/50'
            }`}
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blush-100 text-blush-600">
              <ImagePlus className="h-7 w-7" />
            </span>
            <span className="font-medium">Click to choose a photo, or drag it here</span>
            <span className="text-xs text-ink/50">JPG, PNG or WEBP, up to {MAX_MB} MB. A front-facing, well-lit photo works best.</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(',')}
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0])
              e.target.value = ''
            }}
          />
          {error && <Alert type="error">{error}</Alert>}
        </div>
      ) : (
        <CameraCapture onCapture={(blob) => onPhoto(blob, 'camera')} />
      )}
    </div>
  )
}
