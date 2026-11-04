import { Briefcase, Flower2, Shirt, Sparkles, X } from 'lucide-react'
import { SHAPE_ADVICE } from '../data/styleHandbook.js'

function Section({ icon: Icon, title, items, tone = 'default' }) {
  if (!items?.length) return null
  const avoid = tone === 'avoid'
  return (
    <div className={`rounded-3xl border p-5 sm:p-6 ${avoid ? 'border-dashed border-red-200 bg-red-50/40' : 'border-ink/5 bg-white'}`}>
      <h4 className={`flex items-center gap-2 font-sans font-semibold ${avoid ? 'text-red-700' : ''}`}>
        <span className={`grid h-8 w-8 place-items-center rounded-full ${avoid ? 'bg-red-100 text-red-600' : 'bg-blush-100 text-blush-700'}`}>
          <Icon className="h-4 w-4" />
        </span>
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink/75">
        {items.map((item) => (
          <li key={typeof item === 'string' ? item : item.label} className="flex gap-2">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${avoid ? 'bg-red-400' : 'bg-blush-400'}`} />
            <span>
              {typeof item === 'string' ? (
                item
              ) : (
                <>
                  <strong className="font-semibold text-ink">{item.label}:</strong> {item.text}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Full styling advice for one body shape (from the Indian style handbook).
export default function ShapeAdvice({ shapeKey, men = false }) {
  const advice = SHAPE_ADVICE[shapeKey]
  if (!advice) return null
  return (
    <section className="mt-12">
      <p className="eyebrow">Your complete style guide</p>
      <h2 className="mt-2 text-3xl font-semibold">Saree, ethnic, office &amp; casual advice</h2>

      {advice.saree && (
        <div className="mt-6 rounded-3xl border border-blush-200 bg-blush-50/60 p-5 sm:p-6">
          <h4 className="flex items-center gap-2 font-sans font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-blush-500 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            Saree styling
          </h4>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-ink/75 md:grid-cols-2">
            {advice.saree.map((s) => (
              <li key={s.label} className={s.label === 'Skip' ? 'text-red-700' : ''}>
                <strong className="font-semibold text-ink">{s.label}:</strong> {s.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Section icon={Flower2} title={men ? 'Ethnic & festive (incl. dhoti / veshti)' : 'Ethnic & festive'} items={advice.ethnic} />
        <Section icon={Briefcase} title="Office-ready" items={advice.office} />
        <Section icon={Shirt} title="Casual" items={advice.casual} />
        <Section icon={X} title="Avoid" items={advice.avoid} tone="avoid" />
      </div>
    </section>
  )
}
