import { useMemo, useState } from 'react'
import { Check, Search } from 'lucide-react'
import { GARMENT_GROUPS, TRYON_CATEGORY_LABELS, TRYON_GARMENTS } from '../data/tryOnGarments.js'

// Lets the user pick one of the garment photos for try-on.
// `supported` is the list of garment types the active AI provider can handle
// (null = unknown / AI disabled, so nothing is greyed out).
export default function GarmentPicker({ selectedId, onSelect, supported }) {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('all')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TRYON_GARMENTS.filter(
      (g) =>
        (group === 'all' || g.group === group) &&
        (!q || g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)),
    )
  }, [query, group])

  const selected = TRYON_GARMENTS.find((g) => g.id === selectedId)

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
        <input
          className="input pl-10"
          placeholder="Search outfits..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search outfits"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[{ key: 'all', label: 'All' }, ...GARMENT_GROUPS].map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setGroup(c.key)}
            className={`chip shrink-0 !px-3 !py-1.5 !text-xs ${group === c.key ? 'chip-active' : ''}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid max-h-[420px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
        {list.map((g) => {
          const unsupported = supported && !supported.includes(g.category)
          const active = g.id === selectedId
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onSelect(g.id)}
              title={unsupported ? `${g.name}: not supported by the current AI provider` : g.name}
              aria-pressed={active}
              className={`group relative overflow-hidden rounded-2xl border bg-blush-50/60 text-left transition cursor-pointer ${
                active ? 'border-ink ring-2 ring-ink' : 'border-transparent hover:border-ink/30'
              } ${unsupported ? 'opacity-40' : ''}`}
            >
              <img
                src={g.image}
                alt={g.name}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
              {active && (
                <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-ink text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
              <span className="block truncate px-2 py-1.5 text-xs font-medium">{g.name}</span>
            </button>
          )
        })}
        {list.length === 0 && <p className="col-span-full py-8 text-center text-sm text-ink/50">No outfits match your search.</p>}
      </div>

      {selected && (
        <div className="rounded-2xl bg-blush-50 p-4">
          <p className="font-medium">{selected.name}</p>
          <p className="text-xs text-ink/60">{TRYON_CATEGORY_LABELS[selected.category]}</p>
        </div>
      )}
    </div>
  )
}
