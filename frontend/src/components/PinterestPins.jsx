import { useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'

// Shows Pinterest pins with Pinterest's official embed widget (pinit.js).
// The pin's photo is displayed by Pinterest itself, credited and linked back
// to the original. No images are copied into this project.
const SCRIPT_ID = 'pinterest-pinit'

function loadPinterest() {
  return new Promise((resolve, reject) => {
    if (window.PinUtils) return resolve(window.PinUtils)
    let script = document.getElementById(SCRIPT_ID)
    if (!script) {
      script = document.createElement('script')
      script.id = SCRIPT_ID
      script.async = true
      script.src = 'https://assets.pinterest.com/js/pinit.js'
      document.body.appendChild(script)
    }
    script.addEventListener('load', () => resolve(window.PinUtils))
    script.addEventListener('error', reject)
  })
}

export default function PinterestPins({ pinIds, title, text }) {
  const ref = useRef(null)

  useEffect(() => {
    let cancelled = false
    loadPinterest()
      .then((utils) => !cancelled && utils?.build(ref.current))
      .catch(() => {}) // blocked or offline: the plain links below still work
    return () => {
      cancelled = true
    }
  }, [pinIds])

  if (!pinIds?.length) return null

  return (
    <div className="mt-12 rounded-3xl border border-blush-200 bg-blush-50/50 p-5 sm:p-8">
      <h3 className="font-sans text-lg font-semibold">{title}</h3>
      {text && <p className="mt-1 text-sm text-ink/60">{text}</p>}
      <div ref={ref} key={pinIds.join(',')} className="mt-6 flex flex-wrap justify-center gap-6 sm:justify-start">
        {pinIds.map((id) => (
          <a
            key={id}
            data-pin-do="embedPin"
            data-pin-width="medium"
            href={`https://www.pinterest.com/pin/${id}/`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium hover:border-ink"
          >
            <ExternalLink className="h-4 w-4" /> View on Pinterest
          </a>
        ))}
      </div>
      <p className="mt-4 text-xs text-ink/50">Pins are shown with Pinterest's embed. Images belong to their creators on Pinterest.</p>
    </div>
  )
}
