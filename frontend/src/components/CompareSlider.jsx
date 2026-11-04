import { useState } from 'react'
import { ChevronsLeftRight } from 'lucide-react'

// Drag the handle to compare the original photo (left) with the AI result (right).
export default function CompareSlider({ before, after, beforeLabel = 'Original', afterLabel = 'AI result' }) {
  const [pos, setPos] = useState(50)

  return (
    <div className="relative mx-auto w-fit max-w-full select-none overflow-hidden rounded-2xl bg-blush-50">
      <img src={after} alt={afterLabel} className="block max-h-[600px] w-auto max-w-full" draggable={false} />
      <img
        src={before}
        alt={beforeLabel}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow" />
        <div className="absolute top-1/2 -ml-5 -mt-5 grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-lg">
          <ChevronsLeftRight className="h-5 w-5" />
        </div>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-blush-500/90 px-3 py-1 text-xs font-medium text-white">
        {afterLabel}
      </span>
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare original and result"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}
