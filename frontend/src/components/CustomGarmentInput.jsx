import { useRef, useState } from 'react'
import { ImagePlus, Trash2 } from 'lucide-react'
import Alert from './Alert.jsx'
import { validatePhotoFile } from './PhotoInput.jsx'
import { TRYON_CATEGORY_LABELS } from '../data/tryOnGarments.js'

// Lets the user upload a picture of any garment to try on (instead of one
// from the catalogue). value = { blob, url, category, description } | null
export default function CustomGarmentInput({ value, onChange, supported }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const category = value?.category || 'upper_body'

  const handleFile = (file) => {
    const problem = validatePhotoFile(file)
    if (problem) return setError(problem)
    setError('')
    if (value?.url) URL.revokeObjectURL(value.url)
    onChange({ blob: file, url: URL.createObjectURL(file), category, description: value?.description || '' })
  }

  const update = (patch) => value && onChange({ ...value, ...patch })

  return (
    <div className="space-y-4">
      {value ? (
        <div className="flex flex-col gap-4 sm:flex-row">
          <img src={value.url} alt="Your garment" className="mx-auto h-56 w-44 shrink-0 rounded-2xl bg-blush-50 object-contain" />
          <div className="flex-1 space-y-4">
            <div>
              <label htmlFor="garment-type" className="label">
                What kind of garment is it?
              </label>
              <select
                id="garment-type"
                className="input"
                value={category}
                onChange={(e) => update({ category: e.target.value })}
              >
                {Object.entries(TRYON_CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key} disabled={Boolean(supported && !supported.includes(key))}>
                    {label}
                    {supported && !supported.includes(key) ? ' (not supported by current AI provider)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="garment-desc" className="label">
                Short description <span className="font-normal text-ink/40">(optional)</span>
              </label>
              <input
                id="garment-desc"
                className="input"
                maxLength={120}
                placeholder="e.g. red floral sleeveless kurti"
                value={value.description}
                onChange={(e) => update({ description: e.target.value })}
              />
              <p className="mt-1 text-xs text-ink/50">Helps the AI understand the colour, pattern and style.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-outline btn-sm" onClick={() => inputRef.current?.click()}>
                <ImagePlus className="h-4 w-4" /> Change image
              </button>
              <button
                type="button"
                className="btn-outline btn-sm"
                onClick={() => {
                  URL.revokeObjectURL(value.url)
                  onChange(null)
                }}
              >
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
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
          className={`flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition cursor-pointer ${
            dragging ? 'border-blush-500 bg-blush-50' : 'border-ink/15 hover:border-blush-400 hover:bg-blush-50/50'
          }`}
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blush-100 text-blush-600">
            <ImagePlus className="h-7 w-7" />
          </span>
          <span className="font-medium">Upload a photo of the clothing you want to try</span>
          <span className="text-xs text-ink/50">JPG, PNG or WEBP, up to 10 MB.</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />
      {error && <Alert type="error">{error}</Alert>}
      <Alert type="info" title="Tips for best results">
        <ul className="list-disc space-y-1 pl-4">
          <li>Use a clear, front-facing picture of a single garment - ideally laid flat or on a plain background.</li>
          <li>Photos of the garment on a model also work, but results are less exact.</li>
          <li>Only upload images you are allowed to use (for example your own photo of the garment).</li>
        </ul>
      </Alert>
    </div>
  )
}
