import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, User, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/try-on', label: 'Virtual Try-On' },
  { to: '/body-shape', label: 'Body Shape' },
  { to: '/style-handbook', label: 'Style Handbook' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const linkClass = ({ isActive }) =>
  `relative py-1 text-sm font-medium transition hover:text-blush-600 ${
    isActive ? 'text-ink after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded after:bg-blush-400' : 'text-ink/60'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all ${
        scrolled ? 'border-ink/5 bg-white/90 shadow-sm backdrop-blur-md' : 'border-transparent bg-white'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <Link to="/profile" className="btn-outline btn-sm hidden sm:inline-flex">
              <User className="h-4 w-4" />
              {user.name.split(' ')[0]}
            </Link>
          ) : (
            <Link to="/login" className="btn-outline btn-sm hidden sm:inline-flex">
              Log in
            </Link>
          )}
          <Link to="/try-on" className="btn-primary btn-sm hidden md:inline-flex">
            Try It Now
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-blush-50 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="animate-fade-up border-t border-ink/5 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-blush-50 text-ink' : 'text-ink/70 hover:bg-blush-50'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {user ? (
                <Link to="/profile" className="btn-outline">
                  My Profile
                </Link>
              ) : (
                <Link to="/login" className="btn-outline">
                  Log in
                </Link>
              )}
              <Link to="/try-on" className="btn-primary">
                Try It Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
