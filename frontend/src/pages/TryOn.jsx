import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Columns2, Download, Lock, RefreshCw, ShieldCheck, Sparkles, Trash2, Wand2, X } from 'lucide-react'
import PhotoInput from '../components/PhotoInput.jsx'
import GarmentPicker from '../components/GarmentPicker.jsx'
import CustomGarmentInput from '../components/CustomGarmentInput.jsx'
import CompareSlider from '../components/CompareSlider.jsx'
import Alert from '../components/Alert.jsx'
import Spinner from '../components/Spinner.jsx'
import { getGarment, TRYON_CATEGORY_LABELS } from '../data/tryOnGarments.js'
import { analyzePhoto, generateCustomTryOn, generateTryOn, getTryOnStatus } from '../services/tryOnService.js'
import { useAuth } from '../context/AuthContext.jsx'

const PROVIDER_NAMES = { huggingface: 'Hugging Face', replicate: 'Replicate' }

function StepCard({ number, title, children, aside }) {
  return (
    <section className="card p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 font-sans text-lg font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-sm text-white">{number}</span>
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  )
}

export default function TryOn() {
  const [params, setParams] = useSearchParams()
  const { user, token } = useAuth()

  const [garmentId, setGarmentId] = useState(getGarment(params.get('garment'))?.id || null)
  const garment = getGarment(garmentId)

  const [status, setStatus] = useState({ loading: true, data: null, error: '' })
  const [photo, setPhoto] = useState(null) // { blob, url, source }
  const [analysis, setAnalysis] = useState(null)
  const [result, setResult] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [error, setError] = useState('')
  const [saveHistory, setSaveHistory] = useState(false)
  const [view, setView] = useState('compare')
  const [garmentSource, setGarmentSource] = useState(params.get('source') === 'custom' ? 'custom' : 'catalog') // catalog | custom
  const [customGarment, setCustomGarment] = useState(null) // { blob, url, category, description }
  const abortRef = useRef(null)

  const loadStatus = useCallback(() => {
    setStatus((s) => ({ ...s, loading: true }))
    getTryOnStatus()
      .then((data) => setStatus({ loading: false, data, error: '' }))
      .catch((err) => setStatus({ loading: false, data: null, error: err.message }))
  }, [])

  useEffect(loadStatus, [loadStatus])

  // free object URLs / cancel requests when leaving the page
  useEffect(() => () => photo && URL.revokeObjectURL(photo.url), [photo])
  useEffect(() => () => abortRef.current?.abort(), [])

  // elapsed-time counter while generating
  useEffect(() => {
    if (!generating) return
    const started = Date.now()
    const id = setInterval(() => setElapsed(Math.round((Date.now() - started) / 1000)), 500)
    return () => clearInterval(id)
  }, [generating])

  const aiEnabled = Boolean(status.data?.enabled)
  const supported = aiEnabled ? status.data.supportedCategories : null
  const useCustom = garmentSource === 'custom'
  const garmentReady = useCustom ? Boolean(customGarment) : Boolean(garment)
  const garmentCategory = useCustom ? customGarment?.category : garment?.category
  const unsupported = Boolean(garmentReady && supported && !supported.includes(garmentCategory))

  const switchSource = (source) => {
    setGarmentSource(source)
    setResult(null)
    setError('')
  }

  const handleCustomGarment = (value) => {
    setCustomGarment(value)
    setResult(null)
    setError('')
  }

  const handleSelect = (id) => {
    setGarmentId(id)
    setResult(null)
    setError('')
    setParams({ garment: id }, { replace: true })
  }

  const handlePhoto = (blob, source) => {
    setPhoto({ blob, url: URL.createObjectURL(blob), source })
    setResult(null)
    setError('')
    setAnalysis({ loading: true })
    analyzePhoto(blob)
      .then((data) => setAnalysis(data))
      .catch(() => setAnalysis(null)) // the quality check is optional
  }

  const clearPhoto = () => {
    setPhoto(null)
    setAnalysis(null)
    setResult(null)
  }

  const generate = async () => {
    if (!photo || !garmentReady || !aiEnabled || unsupported) return
    const controller = new AbortController()
    abortRef.current = controller
    setGenerating(true)
    setElapsed(0)
    setError('')
    setResult(null)
    try {
      const common = { photoBlob: photo.blob, saveHistory: Boolean(user && saveHistory), token, signal: controller.signal }
      const data = useCustom
        ? await generateCustomTryOn({ ...common, garment: customGarment })
        : await generateTryOn({ ...common, garment })
      setResult({ ...data, garmentName: useCustom ? 'my-garment' : garment.id })
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message)
    } finally {
      setGenerating(false)
      abortRef.current = null
    }
  }

  const cancel = () => abortRef.current?.abort()

  const canGenerate = photo && garmentReady && aiEnabled && !unsupported && !generating
  let blockReason = ''
  if (!status.loading && !aiEnabled) blockReason = 'AI try-on is not enabled on the server.'
  else if (!photo) blockReason = 'Add your photo first (step 1).'
  else if (!garmentReady) blockReason = useCustom ? 'Upload a photo of the clothing (step 2).' : 'Choose an outfit (step 2).'
  else if (unsupported)
    blockReason = `The current AI provider can't do "${TRYON_CATEGORY_LABELS[garmentCategory]}" garments. Pick a top instead.`

  return (
    <div className="container-page py-10">
      <header className="mb-8 max-w-2xl">
        <p className="eyebrow">Virtual try-on</p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">See it on you</h1>
        <p className="mt-3 text-ink/60">
          Add your photo, choose an outfit, and let the AI model generate how it could look on you.
        </p>
      </header>

      {/* AI status banner */}
      <div className="mb-6">
        {status.loading ? (
          <Spinner label="Checking AI try-on availability..." />
        ) : status.error ? (
          <Alert type="error" title="Backend not reachable">
            {status.error}{' '}
            <button type="button" className="font-semibold underline" onClick={loadStatus}>
              Retry
            </button>
          </Alert>
        ) : aiEnabled ? (
          <Alert type="success" title="AI try-on is enabled">
            {status.data.message}
            {supported && supported.length < 3 && (
              <> Supported garment types: {supported.map((c) => TRYON_CATEGORY_LABELS[c]).join(', ')}.</>
            )}
          </Alert>
        ) : (
          <Alert type="warning" title="AI try-on is not enabled yet">
            {status.data?.message} You can still upload a photo and choose outfits, but no try-on images will be
            generated, and we never show placeholder images as AI results. See the README section "Enabling AI
            try-on".
          </Alert>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="min-w-0 space-y-6">
          <StepCard
            number={1}
            title="Your photo"
            aside={
              photo && (
                <button type="button" className="btn-outline btn-sm" onClick={clearPhoto}>
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              )
            }
          >
            {photo ? (
              <div className="space-y-4">
                <img
                  src={photo.url}
                  alt="Your uploaded photo"
                  className="mx-auto max-h-[380px] rounded-2xl object-contain"
                />
                {analysis?.loading && <Spinner label="Checking photo quality..." />}
                {analysis && !analysis.loading && analysis.tips?.length > 0 && (
                  <Alert type="warning" title="Tips for a better result">
                    <ul className="list-disc space-y-1 pl-4">
                      {analysis.tips.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </Alert>
                )}
                {analysis && !analysis.loading && analysis.ok && (
                  <Alert type="success">Photo looks good: face detected, sharp and well lit.</Alert>
                )}
                <button type="button" className="btn-outline w-full" onClick={clearPhoto}>
                  <RefreshCw className="h-4 w-4" /> Use a different photo
                </button>
              </div>
            ) : (
              <PhotoInput onPhoto={handlePhoto} />
            )}
            <p className="mt-4 flex gap-2 text-xs leading-relaxed text-ink/50">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                Your photo stays in this browser until you press Generate. It is then sent to our server
                {aiEnabled && ` and to ${PROVIDER_NAMES[status.data.provider] || 'the AI provider'}`} only to create
                the try-on, and is not stored. <Link to="/privacy" className="underline">Privacy Policy</Link>
              </span>
            </p>
          </StepCard>

          <StepCard number={2} title="Choose an outfit">
            <div className="mb-5 inline-flex rounded-full bg-blush-50 p-1" role="tablist" aria-label="Garment source">
              {[
                ['catalog', 'Our outfits'],
                ['custom', 'Upload your own clothing'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={garmentSource === key}
                  onClick={() => switchSource(key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition cursor-pointer ${
                    garmentSource === key ? 'bg-white shadow-sm' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {useCustom ? (
              <CustomGarmentInput value={customGarment} onChange={handleCustomGarment} supported={supported} />
            ) : (
              <GarmentPicker selectedId={garmentId} onSelect={handleSelect} supported={supported} />
            )}
          </StepCard>
        </div>

        {/* Result column */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <StepCard
            number={3}
            title="Your AI try-on"
            aside={
              result && (
                <div className="inline-flex rounded-full bg-blush-50 p-1 text-xs">
                  {[
                    ['compare', 'Slider'],
                    ['side', 'Side by side'],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setView(key)}
                      className={`rounded-full px-3 py-1.5 font-medium cursor-pointer ${view === key ? 'bg-white shadow-sm' : 'text-ink/60'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )
            }
          >
            {/* Inputs summary */}
            {!result && !generating && (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl bg-blush-50 text-center text-xs text-ink/40">
                  {photo ? <img src={photo.url} alt="Selected photo" className="h-full w-full object-cover" /> : 'Your photo'}
                </div>
                <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl bg-blush-50 text-center text-xs text-ink/40">
                  {useCustom ? (
                    customGarment ? (
                      <img src={customGarment.url} alt="Your garment" className="h-full w-full object-contain p-3" />
                    ) : (
                      'Your clothing photo'
                    )
                  ) : garment ? (
                    <img src={garment.image} alt={garment.name} className="h-full w-full object-cover object-top" />
                  ) : (
                    'Selected outfit'
                  )}
                </div>
                <p className="col-span-2 text-center text-sm text-ink/50">
                  {aiEnabled
                    ? 'Your generated try-on image will appear here.'
                    : 'AI try-on is not enabled, so no result can be generated yet.'}
                </p>
              </div>
            )}

            {generating && (
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-b from-blush-50 to-white px-6 py-16 text-center">
                <span className="relative grid h-16 w-16 place-items-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-blush-200" />
                  <Wand2 className="relative h-8 w-8 text-blush-600" />
                </span>
                <p className="font-medium">Generating your look... {elapsed}s</p>
                <p className="max-w-sm text-sm text-ink/50">
                  The AI model is redrawing the garment on your photo. This usually takes 30 to 90 seconds, longer if
                  the free GPU queue is busy.
                </p>
                <button type="button" className="btn-outline btn-sm" onClick={cancel}>
                  <X className="h-4 w-4" /> Cancel
                </button>
              </div>
            )}

            {result && photo && (
              <div className="space-y-4">
                {view === 'compare' ? (
                  <CompareSlider before={photo.url} after={result.image} />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <figure>
                      <img src={photo.url} alt="Original" className="w-full rounded-2xl" />
                      <figcaption className="mt-1 text-center text-xs text-ink/50">Original</figcaption>
                    </figure>
                    <figure>
                      <img src={result.image} alt="AI try-on result" className="w-full rounded-2xl" />
                      <figcaption className="mt-1 text-center text-xs text-ink/50">AI result</figcaption>
                    </figure>
                  </div>
                )}
                <p className="flex items-center justify-center gap-1.5 text-xs text-ink/50">
                  <Sparkles className="h-3.5 w-3.5 text-blush-500" />
                  AI-generated by {result.model} in {result.seconds}s. Results are an approximation of fit and look.
                </p>
                {result.historyId && <Alert type="success">Saved to your try-on history.</Alert>}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={result.image}
                    download={`fashion-fit-${result.garmentName}.jpg`}
                    className="btn-primary flex-1"
                  >
                    <Download className="h-4 w-4" /> Download result
                  </a>
                  <button type="button" className="btn-outline flex-1" onClick={() => setResult(null)}>
                    <Columns2 className="h-4 w-4" /> Try another item
                  </button>
                </div>
              </div>
            )}

            {error && (
              <Alert type="error" title="Try-on failed" className="mt-4">
                {error}
              </Alert>
            )}

            {!result && !generating && (
              <div className="mt-5 space-y-3">
                {user ? (
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-ink/10 p-3 text-sm">
                    <input
                      type="checkbox"
                      checked={saveHistory}
                      onChange={(e) => setSaveHistory(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-blush-500"
                    />
                    <span>
                      Save the generated result to my try-on history.
                      <span className="block text-xs text-ink/50">
                        Stores only the result image (not your original photo) on our server. You can delete it any
                        time from your profile.
                      </span>
                    </span>
                  </label>
                ) : (
                  <p className="flex items-center gap-2 text-xs text-ink/50">
                    <Lock className="h-3.5 w-3.5" />
                    <span>
                      <Link to="/login" state={{ from: '/try-on' }} className="underline">
                        Log in
                      </Link>{' '}
                      to save results to your try-on history (optional).
                    </span>
                  </p>
                )}
                <button type="button" className="btn-primary w-full !py-4" onClick={generate} disabled={!canGenerate}>
                  <Wand2 className="h-5 w-5" /> Generate try-on
                </button>
                {blockReason && <p className="text-center text-xs text-ink/50">{blockReason}</p>}
              </div>
            )}
          </StepCard>
        </div>
      </div>
    </div>
  )
}
