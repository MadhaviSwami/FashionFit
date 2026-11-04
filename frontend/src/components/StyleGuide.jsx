import { useCallback, useEffect, useState } from 'react'
import { AlertTriangle, ArrowUpDown, Camera, Check, Maximize2, X } from 'lucide-react'
import { GUIDE_TABS, ITEMS, PINTEREST_INSPIRATION, STYLE_GUIDE, photoFileName, shopQuery } from '../data/styleGuide.js'
import ShopLinks from './ShopLinks.jsx'
import PinterestPins from './PinterestPins.jsx'
import PhotoLightbox from './PhotoLightbox.jsx'
import STYLE_PHOTOS from '../data/stylePhotos.json'
import { SHAPES, WOMEN_SHAPE_KEYS as WOMEN_SHAPES } from '../data/bodyShape.js'


// Photo sources, in order of preference:
//  1. your own photo:  frontend/public/style-guide/my-photos/<file-name>.jpg
//  2. a free-licence photo listed in data/stylePhotos.json (with credit)
//  3. a "photo coming soon" placeholder
function GuidePhoto({ itemKey, label, onOpen }) {
  const own = `/style-guide/my-photos/${photoFileName(itemKey)}`
  const free = STYLE_PHOTOS[itemKey]
  const sources = [{ src: own }, ...(free ? [{ src: free.src, credit: free }] : [])]
  const [index, setIndex] = useState(0)
  useEffect(() => setIndex(0), [itemKey])
  const current = sources[index]

  if (!current) {
    return (
      <div className="flex h-72 flex-col items-center justify-center gap-2 text-ink/35">
        <Camera className="h-8 w-8" />
        <span className="text-xs font-medium">Photo coming soon</span>
      </div>
    )
  }
  return (
    <>
      <button
        type="button"
        onClick={() => onOpen({ src: current.src, credit: current.credit })}
        className="block w-full cursor-zoom-in"
        aria-label={`View full photo: ${label}`}
      >
        <img
          key={current.src}
          src={current.src}
          alt={label}
          loading="lazy"
          onError={() => setIndex((i) => i + 1)}
          className="h-72 w-full object-cover object-top transition duration-500 group-hover:scale-105"
        />
        <span className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-ink opacity-0 shadow transition group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>
      {current.credit && (
        <a
          href={current.credit.source}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-0 right-0 max-w-full truncate rounded-tl-lg bg-ink/60 px-2 py-0.5 text-[9px] text-white/90 hover:bg-ink/80"
          title={`Photo: ${current.credit.artist} (${current.credit.license}), Wikimedia Commons`}
        >
          Photo: {current.credit.artist} · {current.credit.license}
        </a>
      )}
    </>
  )
}

function GuideCard({ entry, good, onOpen, height }) {
  const item = ITEMS[entry.item]
  if (!item) return null
  // height notes only matter for things we recommend wearing
  const fitsHeight = good && height?.good.includes(entry.item)
  const heightCare = good ? height?.caution[entry.item] : null
  return (
    <figure
      className={`group overflow-hidden rounded-3xl border bg-white transition hover:-translate-y-1 hover:shadow-lg ${
        good ? 'border-emerald-100 hover:shadow-emerald-100' : 'border-red-100 hover:shadow-red-100'
      }`}
    >
      <div className={`relative overflow-hidden ${good ? 'bg-emerald-50/60' : 'bg-red-50/60'}`}>
        <GuidePhoto
          itemKey={entry.item}
          label={item.label}
          onOpen={(photo) => onOpen({ ...photo, label: item.label, why: entry.why, good })}
        />
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white ${
            good ? 'bg-emerald-600' : 'bg-red-500'
          }`}
        >
          {good ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
          {good ? 'Wear this' : 'Avoid'}
        </span>
      </div>
      <figcaption className="space-y-1 p-4">
        <p className="font-medium">{item.label}</p>
        <p className="text-sm leading-relaxed text-ink/60">{entry.why}</p>
        {fitsHeight && (
          <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <ArrowUpDown className="h-3.5 w-3.5" /> Also great for {height.name.toLowerCase()} height
          </p>
        )}
        {heightCare && (
          <p className="flex gap-1.5 text-xs text-amber-700">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              <span className="font-semibold">{height.name}:</span> {heightCare}
            </span>
          </p>
        )}
        {good && <ShopLinks compact query={shopQuery(entry.item)} />}
      </figcaption>
    </figure>
  )
}

export default function StyleGuide({ shapeKey, height = null }) {
  const initial = WOMEN_SHAPES.includes(shapeKey) ? shapeKey : 'hourglass'
  const [shape, setShape] = useState(initial)
  const [tab, setTab] = useState('tops')
  const [viewing, setViewing] = useState(null) // photo shown full-size
  const closeViewer = useCallback(() => setViewing(null), [])

  // follow the calculator's result when it changes
  useEffect(() => {
    if (WOMEN_SHAPES.includes(shapeKey)) setShape(shapeKey)
  }, [shapeKey])

  const guide = STYLE_GUIDE[shape][tab]

  return (
    <section id="style-guide" className="mt-16 scroll-mt-24">
      <p className="eyebrow">Visual style guide</p>
      <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">What to wear for your body shape</h2>
      <p className="mt-3 max-w-2xl text-ink/60">
        Pick a body shape and a category to see photo do's and don'ts for tops, bottoms, kurtis and sarees.
        {shapeKey && WOMEN_SHAPES.includes(shapeKey) && ' We have selected your shape from the calculator.'}
      </p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {WOMEN_SHAPES.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setShape(key)}
            className={`chip shrink-0 ${shape === key ? 'chip-active' : ''}`}
            aria-pressed={shape === key}
          >
            {SHAPES[key].name}
            {key === shapeKey && <span className="ml-1.5 text-[10px] opacity-70">(you)</span>}
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-2 border-b border-ink/10" role="tablist">
        {GUIDE_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-5 py-3 text-sm font-semibold transition cursor-pointer ${
              tab === t.key ? 'border-blush-500 text-ink' : 'border-transparent text-ink/50 hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div key={`${shape}-${tab}`} className="animate-fade-up">
        <h3 className="mt-8 flex items-center gap-2 font-sans text-lg font-semibold text-emerald-700">
          <Check className="h-5 w-5" /> Wear this
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {guide.wear.map((entry) => (
            <GuideCard key={entry.item} entry={entry} good onOpen={setViewing} height={height} />
          ))}
        </div>

        <h3 className="mt-10 flex items-center gap-2 font-sans text-lg font-semibold text-red-600">
          <X className="h-5 w-5" /> Avoid
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {guide.avoid.map((entry) => (
            <GuideCard key={entry.item} entry={entry} good={false} onOpen={setViewing} />
          ))}
        </div>
      </div>

      <PhotoLightbox photo={viewing} onClose={closeViewer} />

      <PinterestPins
        pinIds={PINTEREST_INSPIRATION[shape]}
        title={`${SHAPES[shape].name} inspiration from Pinterest`}
        text="Real outfit ideas for this body shape, shown directly from Pinterest."
      />

      <p className="mt-6 text-xs text-ink/50">
        Photos are free-licence images from Wikimedia Commons, credited on each picture (click a credit for the
        source and licence). These are general styling suggestions. Wear whatever makes you feel confident.
      </p>
    </section>
  )
}
