import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpDown, BookOpen, Info, Lock, Ruler, RotateCcw, Sparkles, Target } from 'lucide-react'
import BodyShapeFigure from '../components/BodyShapeFigure.jsx'
import StyleGuide from '../components/StyleGuide.jsx'
import ShapeAdvice from '../components/ShapeAdvice.jsx'
import Alert from '../components/Alert.jsx'
import { MEN_SHAPE_KEYS, RANGES, SHAPES, WOMEN_SHAPE_KEYS, calculateBodyShape, toInches, validateMeasurements } from '../data/bodyShape.js'
import { MEASURE_GUIDE, SHAPE_ADVICE } from '../data/styleHandbook.js'
import { HEIGHT_RANGE_CM, formatHeight, heightGroup, heightToCm } from '../data/height.js'
import { readJSON, removeKey, writeJSON } from '../services/storage.js'

const STORAGE_KEY = 'ff_body_measurements'
const EMPTY = { gender: 'women', unit: 'cm', height: '', heightFt: '', heightIn: '', shoulders: '', bust: '', waist: '', hips: '' }

// returns an error message, or '' when the height is empty or valid
function heightError(form) {
  const blank = form.unit === 'cm' ? form.height === '' : form.heightFt === '' && form.heightIn === ''
  if (blank) return ''
  const cm = heightToCm(form)
  if (Number.isNaN(cm)) return 'Enter feet and inches, e.g. 5 ft 3 in.'
  if (cm < HEIGHT_RANGE_CM.min || cm > HEIGHT_RANGE_CM.max) return "Height should be between 4'0\" and 7'2\" (120-220 cm)."
  return ''
}

const toNumber = (v) => (v === '' ? '' : Number(v))

export default function BodyShape() {
  const saved = readJSON(STORAGE_KEY, null)
  const [form, setForm] = useState(saved ? { ...EMPTY, ...saved } : EMPTY)
  const [remember, setRemember] = useState(Boolean(saved))
  const [errors, setErrors] = useState({})
  const [height, setHeight] = useState(() => (saved && !heightError({ ...EMPTY, ...saved }) ? heightGroup(heightToCm({ ...EMPTY, ...saved }), saved.gender) : null))
  const [result, setResult] = useState(() => {
    if (!saved) return null
    const m = { ...saved, shoulders: toNumber(saved.shoulders ?? ''), bust: toNumber(saved.bust), waist: toNumber(saved.waist), hips: toNumber(saved.hips) }
    return Object.keys(validateMeasurements(m)).length ? null : calculateBodyShape(m)
  })

  const isMen = form.gender === 'men'
  const range = RANGES[form.unit]
  const unitLabel = form.unit === 'cm' ? 'cm' : 'in'

  // live silhouette (in inches so proportions are the same in either unit)
  const live = useMemo(() => {
    const n = (v) => (v === '' ? NaN : toInches(Number(v), form.unit))
    return { shoulders: n(form.shoulders), bust: n(form.bust), waist: n(form.waist), hips: n(form.hips) }
  }, [form])

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  const switchUnit = (unit) => {
    if (unit === form.unit) return
    const convert = (v) => {
      if (v === '') return ''
      const n = unit === 'cm' ? Number(v) * 2.54 : Number(v) / 2.54
      return String(Math.round(n * 10) / 10)
    }
    setForm((f) => {
      // move the height between "cm" and "ft + in"
      const cm = heightToCm(f)
      let h = { height: '', heightFt: '', heightIn: '' }
      if (!Number.isNaN(cm)) {
        if (unit === 'cm') h.height = String(Math.round(cm))
        else {
          const total = Math.round(cm / 2.54)
          h = { height: '', heightFt: String(Math.floor(total / 12)), heightIn: String(total % 12) }
        }
      }
      return { ...f, ...h, unit, shoulders: convert(f.shoulders), bust: convert(f.bust), waist: convert(f.waist), hips: convert(f.hips) }
    })
    setErrors({})
  }

  const switchGender = (gender) => {
    setForm((f) => ({ ...f, gender }))
    setResult(null)
    setHeight(null)
    setErrors({})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const m = {
      gender: form.gender,
      unit: form.unit,
      shoulders: toNumber(form.shoulders),
      bust: toNumber(form.bust),
      waist: toNumber(form.waist),
      hips: toNumber(form.hips),
    }
    const problems = validateMeasurements(m)
    const hErr = heightError(form)
    if (hErr) problems.height = hErr
    setErrors(problems)
    if (Object.keys(problems).length) {
      setResult(null)
      setHeight(null)
      return
    }
    setResult(calculateBodyShape(m))
    setHeight(heightGroup(heightToCm(form), form.gender))
    if (remember) writeJSON(STORAGE_KEY, form)
    else removeKey(STORAGE_KEY)
    setTimeout(() => document.getElementById('shape-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const reset = () => {
    setForm({ ...EMPTY, gender: form.gender, unit: form.unit })
    setResult(null)
    setHeight(null)
    setErrors({})
    removeKey(STORAGE_KEY)
    setRemember(false)
  }

  const fields = [
    { key: 'shoulders', label: 'Shoulders', required: false },
    { key: 'bust', label: isMen ? 'Chest' : 'Bust', required: true },
    { key: 'waist', label: 'Waist', required: true },
    { key: 'hips', label: 'Hips', required: true },
  ]
  const advice = result ? SHAPE_ADVICE[result.key] : null

  return (
    <div className="container-page py-10">
      <header className="max-w-2xl">
        <p className="eyebrow">Body shape calculator</p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Discover your body shape</h1>
        <p className="mt-3 text-ink/60">
          Enter a few measurements to find your body shape, then get saree, ethnic, office and casual styling advice for your
          proportions.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Form */}
        <form onSubmit={onSubmit} noValidate className="card min-w-0 space-y-6 p-5 sm:p-8">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="label">I want shapes for</p>
              <div className="inline-flex rounded-full bg-blush-50 p-1" role="radiogroup" aria-label="Body shape type">
                {[
                  ['women', 'Women'],
                  ['men', 'Men'],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={form.gender === key}
                    onClick={() => switchGender(key)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition cursor-pointer ${form.gender === key ? 'bg-white shadow-sm' : 'text-ink/60 hover:text-ink'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="label">Units</p>
              <div className="inline-flex rounded-full bg-blush-50 p-1" role="radiogroup" aria-label="Units">
                {[
                  ['cm', 'Centimetres'],
                  ['in', 'Inches'],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={form.unit === key}
                    onClick={() => switchUnit(key)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition cursor-pointer ${form.unit === key ? 'bg-white shadow-sm' : 'text-ink/60 hover:text-ink'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor={form.unit === 'cm' ? 'height' : 'heightFt'} className="label">
              Height <span className="font-normal text-ink/40">(optional - adds advice for your height)</span>
            </label>
            {form.unit === 'cm' ? (
              <div className="relative sm:max-w-[calc(50%-0.625rem)]">
                <input
                  id="height"
                  type="number"
                  inputMode="decimal"
                  min={HEIGHT_RANGE_CM.min}
                  max={HEIGHT_RANGE_CM.max}
                  placeholder="e.g. 160"
                  value={form.height}
                  onChange={(e) => set('height', e.target.value)}
                  className={`input pr-12 ${errors.height ? 'input-error' : ''}`}
                  aria-invalid={Boolean(errors.height)}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink/40">cm</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:max-w-[calc(50%-0.625rem)]">
                {[
                  ['heightFt', 'ft', 'e.g. 5', 4, 7],
                  ['heightIn', 'in', 'e.g. 3', 0, 11],
                ].map(([key, unit, ph, min, max]) => (
                  <div key={key} className="relative">
                    <input
                      id={key}
                      type="number"
                      inputMode="numeric"
                      min={min}
                      max={max}
                      placeholder={ph}
                      aria-label={unit === 'ft' ? 'Height in feet' : 'Height, extra inches'}
                      value={form[key]}
                      onChange={(e) => set(key, e.target.value)}
                      className={`input pr-10 ${errors.height ? 'input-error' : ''}`}
                      aria-invalid={Boolean(errors.height)}
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink/40">{unit}</span>
                  </div>
                ))}
              </div>
            )}
            {errors.height && <p className="mt-1 text-xs text-red-600">{errors.height}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map(({ key, label, required }) => (
              <div key={key}>
                <label htmlFor={key} className="label">
                  {label} {!required && <span className="font-normal text-ink/40">(optional)</span>}
                </label>
                <div className="relative">
                  <input
                    id={key}
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min={range.min}
                    max={range.max}
                    placeholder={form.unit === 'cm' ? 'e.g. 90' : 'e.g. 36'}
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    className={`input pr-12 ${errors[key] ? 'input-error' : ''}`}
                    aria-invalid={Boolean(errors[key])}
                    aria-describedby={errors[key] ? `${key}-error` : undefined}
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink/40">{unitLabel}</span>
                </div>
                {errors[key] && (
                  <p id={`${key}-error`} className="mt-1 text-xs text-red-600">
                    {errors[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="-mt-2 text-xs text-ink/50">
            Shoulders are optional but give a more accurate result
            {isMen ? ' (the handbook compares shoulders with waist and hips).' : ' (they help spot Inverted Triangle and Pear shapes).'}{' '}
            {isMen
              ? 'Measure the waist at the navel - the widest point of the midsection.'
              : 'Measure the waist at the narrowest part of your torso, usually just above the navel.'}
          </p>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/70">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mt-0.5 h-4 w-4 accent-blush-500" />
            <span>
              Remember my measurements on this device
              <span className="block text-xs text-ink/50">Saved only in this browser. They are never sent to our server.</span>
            </span>
          </label>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary flex-1">
              <Sparkles className="h-4 w-4" /> Find my body shape
            </button>
            <button type="button" className="btn-outline" onClick={reset}>
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>

          <p className="flex gap-2 text-xs text-ink/50">
            <Lock className="h-4 w-4 shrink-0 text-emerald-600" />
            The calculation runs entirely in your browser. Your measurements are not uploaded.
          </p>
        </form>

        {/* Live figure + how to measure */}
        <aside className="min-w-0 space-y-6">
          <div className="card flex flex-col items-center p-6">
            <div className="h-72 w-full max-w-xs">
              <BodyShapeFigure {...live} gender={form.gender} />
            </div>
            <p className="mt-2 text-center text-xs text-ink/50">The silhouette updates as you type. It shows proportions only.</p>
          </div>
          <div className="card p-6">
            <h2 className="flex items-center gap-2 font-sans text-base font-semibold">
              <Ruler className="h-5 w-5 text-blush-500" /> How to measure
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {MEASURE_GUIDE[isMen ? 'men' : 'women'].map((h) => (
                <li key={h.label}>
                  <span className="font-medium">{h.label}:</span> <span className="text-ink/60">{h.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink/50">
              You need a soft measuring tape and a mirror. Stand straight, breathe normally, and keep the tape snug but
              not tight.
            </p>
            <Link to="/style-handbook" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blush-600 hover:underline">
              <BookOpen className="h-3.5 w-3.5" /> See the measurement patterns for every shape
            </Link>
          </div>
        </aside>
      </div>

      {/* Result */}
      {result && (
        <section id="shape-result" className="mt-12 scroll-mt-24 animate-fade-up">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush-100 via-blush-50 to-white p-6 sm:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
              <div className="mx-auto h-64 w-48">
                <BodyShapeFigure {...result.inches} gender={form.gender} highlight={false} />
              </div>
              <div>
                <p className="eyebrow">Your body shape</p>
                <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">{result.shape.name}</h2>
                <p className="mt-1 text-lg italic text-ink/60">{result.shape.summary}</p>
                {advice && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/80 p-4">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blush-700">
                        <Ruler className="h-3.5 w-3.5" /> Identify
                      </p>
                      <p className="mt-1.5 text-sm text-ink/75">{advice.identify}</p>
                    </div>
                    <div className="rounded-2xl bg-white/80 p-4">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blush-700">
                        <Target className="h-3.5 w-3.5" /> Styling goal
                      </p>
                      <p className="mt-1.5 text-sm text-ink/75">{advice.goal}</p>
                    </div>
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  {!isMen && (
                    <a href="#style-guide" className="btn-pink">
                      See pictures: what to wear &amp; avoid
                    </a>
                  )}
                  <Link to="/style-handbook" className="btn-outline">
                    <BookOpen className="h-4 w-4" /> Full style handbook
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {height && (
            <div className="card mt-6 p-6 sm:p-8">
              <p className="eyebrow flex items-center gap-1.5">
                <ArrowUpDown className="h-3.5 w-3.5" /> Your height
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                {height.name} <span className="text-base font-normal text-ink/50">· {formatHeight(height.cm)}</span>
              </h3>
              <p className="mt-1 text-sm text-ink/60">
                {height.name} means {height.rule}. {height.goal}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {height.tips.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-ink/75">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-500" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ink/50">
                Use this together with your body shape: shape decides the cut, height decides the length, print size and
                border width.
                {!isMen && height.key !== 'average' && ' The photo guide below marks picks that suit your height.'}
              </p>
            </div>
          )}

          <Alert type="info" className="mt-4">
            Most people are a blend of two shapes - read both and pick the advice that matches what you see in the
            mirror. Body shape can change with age, weight and fitness, so reassess every few years. These are
            guidelines, not rules, and they say nothing about health.
          </Alert>

          <ShapeAdvice shapeKey={result.key} men={isMen} />

        </section>
      )}

      {!isMen && <StyleGuide shapeKey={result?.key} height={height} />}

      <section className="mt-16">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Info className="h-6 w-6 text-blush-500" /> All {isMen ? 'men’s' : 'women’s'} body shapes
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(SHAPES)
            .filter(([key]) => (isMen ? MEN_SHAPE_KEYS : WOMEN_SHAPE_KEYS).includes(key))
            .map(([key, s]) => (
              <div
                key={key}
                className={`rounded-3xl border p-5 transition ${result?.key === key ? 'border-ink bg-blush-50' : 'border-ink/5 bg-white hover:border-ink/20'}`}
              >
                <h3 className="font-sans font-semibold">
                  {s.name} {result?.key === key && <span className="ml-1 rounded-full bg-ink px-2 py-0.5 text-[10px] text-white">You</span>}
                </h3>
                <p className="mt-1 text-sm text-ink/60">{SHAPE_ADVICE[key]?.identify || s.summary}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
