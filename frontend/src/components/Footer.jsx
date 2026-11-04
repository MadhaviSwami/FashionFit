import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white/70">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Your style, your way. Discover your body shape and preview outfits with AI-powered virtual try-on.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">Try it</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-blush-300" to="/try-on">Virtual Try-On</Link></li>
            <li><Link className="hover:text-blush-300" to="/try-on?source=custom">Try your own clothing</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">Style</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-blush-300" to="/body-shape">Body Shape Calculator</Link></li>
            <li><Link className="hover:text-blush-300" to="/style-handbook">Style Handbook</Link></li>
            <li><Link className="hover:text-blush-300" to="/profile">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-blush-300" to="/about">About Us</Link></li>
            <li><Link className="hover:text-blush-300" to="/contact">Contact</Link></li>
            <li><Link className="hover:text-blush-300" to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Fashion Fit. A styling and virtual try-on project - nothing is sold on this site.</p>
          <p>Try-on outfit photos are provided by the site owner.</p>
        </div>
      </div>
    </footer>
  )
}
