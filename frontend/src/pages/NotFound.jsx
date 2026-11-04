import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <p className="font-display text-8xl font-semibold text-blush-300">404</p>
        <h1 className="mt-4 text-3xl font-semibold">This page went out of style</h1>
        <p className="mt-2 text-ink/60">We couldn't find the page you were looking for.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">Back to home</Link>
          <Link to="/try-on" className="btn-outline">Virtual Try-On</Link>
        </div>
      </div>
    </div>
  )
}
