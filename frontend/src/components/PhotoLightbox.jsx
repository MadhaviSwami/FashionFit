import { useEffect } from 'react'
import { Check, X } from 'lucide-react'

// Full-screen viewer for a style guide photo. Close with the X button,
// the Esc key, or by clicking the dark background.
export default function PhotoLightbox({ photo, onClose }) {
  useEffect(() => {
    if (!photo) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden' // stop the page scrolling behind
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [photo, onClose])

  if (!photo) return null

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-up items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={photo.label}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        autoFocus
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white cursor-pointer"
      >
        <X className="h-5 w-5" />
      </button>

      <figure className="flex max-h-full max-w-3xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.label} className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl" />
        <figcaption className="mt-4 max-w-xl text-center text-white">
          {photo.good !== undefined && (
            <span
              className={`mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                photo.good ? 'bg-emerald-600' : 'bg-red-500'
              }`}
            >
              {photo.good ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
              {photo.good ? 'Wear this' : 'Avoid'}
            </span>
          )}
          <p className="text-lg font-semibold">{photo.label}</p>
          {photo.why && <p className="mt-1 text-sm text-white/75">{photo.why}</p>}
          {photo.credit && (
            <a
              href={photo.credit.source}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs text-white/60 underline hover:text-white"
            >
              Photo: {photo.credit.artist} · {photo.credit.license} · Wikimedia Commons
            </a>
          )}
        </figcaption>
      </figure>
    </div>
  )
}
