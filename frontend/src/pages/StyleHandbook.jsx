import { Link } from 'react-router-dom'
import { Calculator, CheckCircle2, Palette, Ruler, Sparkles } from 'lucide-react'
import {
  CHEAT_SHEET,
  FIT_CHECKLIST,
  FOOTWEAR,
  MEASURE_GUIDE,
  MEN_ETHNIC,
  NECKLINES,
  PETTICOAT_NOTE,
  PRINCIPLES,
  SAREE_DRAPES,
  SAREE_FABRICS,
  SHAPE_PATTERNS,
  SIZE_NOTES,
  SKIN_TONES,
  SKIN_TONE_TIP,
} from '../data/styleHandbook.js'

const SECTIONS = [
  { id: 'identify', label: 'Identify your shape' },
  { id: 'principles', label: 'Styling principles' },
  { id: 'sarees', label: 'Saree fabrics & drapes' },
  { id: 'necklines', label: 'Blouse necklines' },
  { id: 'sizes', label: 'Petite, tall & plus-size' },
  { id: 'men', label: "Men's ethnic wear" },
  { id: 'cheatsheet', label: 'Cheat sheets' },
]

function Table({ head, rows, tone = 'women' }) {
  const headBg = tone === 'men' ? 'bg-slate-700' : 'bg-blush-700'
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-ink/5">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className={`${headBg} text-white`}>
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-ink/5 odd:bg-blush-50/40">
              {row.map((cell, idx) => (
                <td key={idx} className={`px-4 py-3 align-top ${idx === 0 ? 'font-semibold text-ink' : 'text-ink/70'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SectionHeading({ id, eyebrow, title, text }) {
  return (
    <div id={id} className="scroll-mt-24">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 max-w-3xl text-ink/60">{text}</p>}
    </div>
  )
}

export default function StyleHandbook() {
  return (
    <div className="container-page py-10">
      <header className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#4a1d2b] via-[#7a2f45] to-[#b46a4d] px-6 py-12 text-white sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">An Indian wardrobe handbook</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">
          Dress for Your <span className="italic text-amber-200">Body Shape</span>
        </h1>
        <p className="mt-4 max-w-2xl text-white/80">
          A detailed guide to choosing sarees, ethnic wear, office wear and casual outfits that flatter your natural
          shape - for women and men. Every body is beautiful - styling is simply about balance and proportion.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {['Sarees & Drapes', 'Ethnic & Festive', 'Office-Ready', 'Casual', 'Women', 'Men'].map((t) => (
            <span key={t} className="rounded-full border border-white/40 px-4 py-1.5 text-sm">
              {t}
            </span>
          ))}
        </div>
        <Link to="/body-shape" className="btn-pink mt-8">
          <Calculator className="h-4 w-4" /> Find your shape with the calculator
        </Link>
      </header>

      <nav className="sticky top-16 z-20 -mx-4 mt-6 overflow-x-auto border-b border-ink/5 bg-white/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0" aria-label="Handbook sections">
        <div className="flex gap-2">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="chip shrink-0 !py-1.5 !text-xs">
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mt-12 space-y-20">
        {/* A. Identify */}
        <section>
          <SectionHeading
            id="identify"
            eyebrow="Section A"
            title="How to identify your body shape"
            text="You need a soft measuring tape and a mirror. Stand straight, breathe normally, and keep the tape snug but not tight."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ['women', 'Women - measure these', 'border-blush-500 bg-blush-50'],
              ['men', 'Men - measure these', 'border-slate-600 bg-slate-50'],
            ].map(([key, title, cls]) => (
              <div key={key} className={`rounded-2xl border-l-4 p-5 ${cls}`}>
                <h3 className="flex items-center gap-2 font-sans font-semibold">
                  <Ruler className="h-4 w-4" /> {title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-ink/75">
                  {MEASURE_GUIDE[key].map((m) => (
                    <li key={m.label}>
                      <strong className="text-ink">{m.label}:</strong> {m.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h3 className="mt-10 font-sans text-lg font-semibold">Women's shape calculator</h3>
          <Table head={['Shape', 'Measurement pattern', 'Visual clue']} rows={SHAPE_PATTERNS.women} />
          <h3 className="mt-10 font-sans text-lg font-semibold">Men's shape calculator</h3>
          <Table head={['Shape', 'Measurement pattern', 'Visual clue']} rows={SHAPE_PATTERNS.men} tone="men" />
          <p className="mt-4 text-sm italic text-ink/50">
            Most people are a blend of two shapes. Read both pages and pick the advice that matches what you see in the
            mirror. Body shape can also change with age, weight and fitness - reassess every few years.
          </p>
        </section>

        {/* B. Principles */}
        <section>
          <SectionHeading
            id="principles"
            eyebrow="Section B"
            title="Universal styling principles"
            text="These rules work for every shape and every outfit - sarees, kurtas, suits or jeans."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, idx) => (
              <div key={p.label} className="rounded-2xl border-l-4 border-blush-600 bg-blush-50/60 p-5">
                <h3 className="font-sans font-semibold text-blush-700">
                  {idx + 1}. {p.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border-l-4 border-amber-600 bg-amber-50/60 p-5">
            <h3 className="flex items-center gap-2 font-sans font-semibold text-amber-800">
              <Palette className="h-4 w-4" /> Colour &amp; skin tone in brief
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-ink/75">
              {SKIN_TONES.map((t) => (
                <li key={t.label}>
                  <strong className="text-ink">{t.label}:</strong> {t.text}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink/60">{SKIN_TONE_TIP}</p>
          </div>
        </section>

        {/* Sarees */}
        <section>
          <SectionHeading id="sarees" eyebrow="Women · Reference" title="Saree fabric & drape guide" />
          <Table head={['Fabric', 'Effect on the body', 'Best for', 'Occasion']} rows={SAREE_FABRICS} />
          <h3 className="mt-10 font-sans text-lg font-semibold">Drape styles at a glance</h3>
          <Table head={['Drape', 'How it looks', 'Flatters']} rows={SAREE_DRAPES} />
          <div className="mt-6 rounded-2xl border-l-4 border-blush-600 bg-blush-50/60 p-5">
            <h3 className="font-sans font-semibold text-blush-700">Petticoat matters</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">{PETTICOAT_NOTE}</p>
          </div>
        </section>

        {/* Necklines */}
        <section>
          <SectionHeading id="necklines" eyebrow="Women · Reference" title="Blouse necklines & sleeves" />
          <Table head={['Neckline / Sleeve', 'Effect', 'Best for']} rows={NECKLINES} />
        </section>

        {/* Sizes */}
        <section>
          <SectionHeading id="sizes" eyebrow="Women · Reference" title="Height & size notes" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {SIZE_NOTES.map((n) => (
              <div key={n.title} className="card p-5">
                <h3 className="font-sans font-semibold text-blush-700">{n.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink/75">
                  {n.tips.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-400" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Men */}
        <section>
          <SectionHeading
            id="men"
            eyebrow="Men · Reference"
            title="Ethnic wear guide & fit checklist"
            text="Kurta, sherwani, bandhgala, Nehru jacket and the dhoti / veshti / mundu - the traditional unstitched drape for men."
          />
          <Table head={['Garment', 'Ideal fit & length', 'Best for']} rows={MEN_ETHNIC} tone="men" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border-l-4 border-slate-600 bg-slate-50 p-5">
              <h3 className="font-sans font-semibold text-slate-800">Fit checklist - before you buy</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink/75">
                {FIT_CHECKLIST.map((f) => (
                  <li key={f} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-l-4 border-slate-600 bg-slate-50 p-5">
              <h3 className="font-sans font-semibold text-slate-800">Footwear &amp; accessories</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink/75">
                {FOOTWEAR.map((f) => (
                  <li key={f.label}>
                    <strong className="text-ink">{f.label}:</strong> {f.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cheat sheets */}
        <section>
          <SectionHeading id="cheatsheet" eyebrow="Quick reference" title="One-page cheat sheet" />
          <h3 className="mt-6 font-sans text-lg font-semibold text-blush-700">Women</h3>
          <Table head={['Shape', ...CHEAT_SHEET.women.columns]} rows={CHEAT_SHEET.women.rows} />
          <h3 className="mt-10 font-sans text-lg font-semibold text-slate-700">Men</h3>
          <Table head={['Shape', ...CHEAT_SHEET.men.columns]} rows={CHEAT_SHEET.men.rows} tone="men" />
          <div className="mt-8 rounded-2xl border-l-4 border-amber-600 bg-amber-50/60 p-5">
            <h3 className="flex items-center gap-2 font-sans font-semibold text-amber-800">
              <Sparkles className="h-4 w-4" /> Remember
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              These are guidelines, not rules. Confidence, comfort and good fit make the biggest difference. Wear what
              makes you feel like yourself - and use these tips to make it look its best.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
