import { useCallback, useEffect, useRef, useState } from 'react'
import { Camera, Check, RefreshCw, RotateCcw, Timer } from 'lucide-react'
import Alert from './Alert.jsx'

function cameraErrorMessage(err) {
  switch (err?.name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return 'Camera permission was denied. Allow camera access in your browser (usually the camera icon in the address bar) and try again, or upload a photo instead.'
    case 'NotFoundError':
    case 'OverconstrainedError':
      return 'No camera was found on this device. Please upload a photo instead.'
    case 'NotReadableError':
      return 'Your camera is being used by another app. Close other apps that use the camera and try again.'
    default:
      return `Could not start the camera${err?.message ? ` (${err.message})` : ''}. Please upload a photo instead.`
  }
}

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [state, setState] = useState('idle') // idle | starting | live | countdown | captured | error
  const [error, setError] = useState('')
  const [facing, setFacing] = useState('user')
  const [canSwitch, setCanSwitch] = useState(false)
  const [useTimer, setUseTimer] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [captured, setCaptured] = useState(null) // { blob, url }

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }, [])

  useEffect(() => stopStream, [stopStream])
  useEffect(() => () => captured && URL.revokeObjectURL(captured.url), [captured])

  const start = useCallback(
    async (mode = facing) => {
      setError('')
      if (!window.isSecureContext) {
        setError('The camera only works on a secure page (https:// or http://localhost). Please upload a photo instead.')
        setState('error')
        return
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        setError('Your browser does not support camera access. Please upload a photo instead.')
        setState('error')
        return
      }
      stopStream()
      setState('starting')
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 1280 } },
          audio: false,
        })
        streamRef.current = stream
        const devices = await navigator.mediaDevices.enumerateDevices()
        setCanSwitch(devices.filter((d) => d.kind === 'videoinput').length > 1)
        setState('live')
      } catch (err) {
        setError(cameraErrorMessage(err))
        setState('error')
      }
    },
    [facing, stopStream],
  )

  // attach the stream once the <video> element is on screen
  useEffect(() => {
    if ((state === 'live' || state === 'countdown') && videoRef.current && streamRef.current) {
      if (videoRef.current.srcObject !== streamRef.current) {
        videoRef.current.srcObject = streamRef.current
        videoRef.current.play().catch(() => {})
      }
    }
  }, [state])

  const takePhoto = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (facing === 'user') {
      // mirror selfies so the photo matches what the user saw
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }
    ctx.drawImage(video, 0, 0)
    canvas.toBlob(
      (blob) => {
        if (!blob) return
        stopStream()
        setCaptured({ blob, url: URL.createObjectURL(blob) })
        setState('captured')
      },
      'image/jpeg',
      0.92,
    )
  }, [facing, stopStream])

  const handleCapture = () => {
    if (!useTimer) return takePhoto()
    setState('countdown')
    let n = 3
    setCountdown(n)
    const id = setInterval(() => {
      n -= 1
      setCountdown(n)
      if (n === 0) {
        clearInterval(id)
        takePhoto()
      }
    }, 1000)
  }

  const retake = () => {
    setCaptured(null)
    start()
  }

  const switchCamera = () => {
    const next = facing === 'user' ? 'environment' : 'user'
    setFacing(next)
    start(next)
  }

  if (state === 'captured' && captured) {
    return (
      <div className="space-y-4">
        <p className="text-sm font-medium">Preview: happy with this photo?</p>
        <img src={captured.url} alt="Captured preview" className="mx-auto max-h-[420px] rounded-2xl object-contain" />
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" className="btn-outline" onClick={retake}>
            <RotateCcw className="h-4 w-4" /> Retake
          </button>
          <button type="button" className="btn-primary" onClick={() => onCapture(captured.blob)}>
            <Check className="h-4 w-4" /> Use this photo
          </button>
        </div>
      </div>
    )
  }

  if (state === 'live' || state === 'countdown') {
    return (
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl bg-ink">
          <video
            ref={videoRef}
            playsInline
            muted
            className={`mx-auto max-h-[420px] w-full object-contain ${facing === 'user' ? '-scale-x-100' : ''}`}
          />
          <div className="pointer-events-none absolute inset-6 rounded-[2rem] border-2 border-dashed border-white/40" />
          {state === 'countdown' && (
            <div className="absolute inset-0 grid place-items-center bg-ink/30">
              <span className="font-display text-8xl font-semibold text-white">{countdown || ''}</span>
            </div>
          )}
        </div>
        <p className="text-center text-xs text-ink/50">Stand facing the camera with your upper body inside the frame.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink/70">
            <input
              type="checkbox"
              checked={useTimer}
              onChange={(e) => setUseTimer(e.target.checked)}
              className="h-4 w-4 accent-blush-500"
            />
            <Timer className="h-4 w-4" /> 3s timer
          </label>
          {canSwitch && (
            <button type="button" className="btn-outline btn-sm" onClick={switchCamera} disabled={state === 'countdown'}>
              <RefreshCw className="h-4 w-4" /> Switch camera
            </button>
          )}
          <button type="button" className="btn-primary" onClick={handleCapture} disabled={state === 'countdown'}>
            <Camera className="h-4 w-4" /> Capture
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 text-center">
      {state === 'error' && <Alert type="error" className="text-left">{error}</Alert>}
      <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-ink/15 px-6 py-10">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blush-100 text-blush-600">
          <Camera className="h-7 w-7" />
        </span>
        <p className="text-sm text-ink/60">
          We'll ask your browser for permission to use the camera. Nothing is recorded until you press Capture.
        </p>
        <button type="button" className="btn-primary" onClick={() => start()} disabled={state === 'starting'}>
          {state === 'starting' ? 'Starting camera...' : state === 'error' ? 'Try again' : 'Start camera'}
        </button>
      </div>
    </div>
  )
}
