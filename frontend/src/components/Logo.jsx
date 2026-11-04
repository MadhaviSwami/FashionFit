import { useState } from 'react'
import { Link } from 'react-router-dom'

// FashionFit logo (recreated from the Figma design): a ribbon-style "F" mark
// in black and blush pink, followed by "ashionFit" in Playfair Display.
// It animates in on page load and replays on hover (see .logo-* in index.css).

export function LogoMark({ className = '', light = false }) {
  const ink = light ? '#ffffff' : '#111111'
  return (
    <svg viewBox="60 60 470 475" className={className} aria-hidden="true">
      {/* top ribbon */}
      <path
        className="logo-top"
        fill={ink}
        d="M70 255 C80 140 170 70 300 68 L520 68 C505 130 470 165 380 172 L250 178 C150 182 95 210 70 255 Z"
      />
      {/* small pink leaf */}
      <path
        className="logo-leaf-1"
        fill="#F4B6C6"
        d="M70 330 C75 270 130 200 240 195 C215 235 160 255 120 270 C95 282 78 300 70 330 Z"
      />
      {/* stem */}
      <path
        className="logo-stem"
        fill={ink}
        d="M75 525 C70 420 80 300 160 268 C200 255 250 252 300 255 C240 290 205 340 200 400 C195 470 150 515 75 525 Z"
      />
      {/* large pink leaf */}
      <path
        className="logo-leaf-2"
        fill="#F4B6C6"
        d="M210 395 C235 310 300 258 435 252 C425 320 360 360 300 375 C260 385 225 390 210 395 Z"
      />
    </svg>
  )
}

const WORD = 'ashionFit'.split('')

export default function Logo({ light = false, onClick }) {
  // changing the key replays the CSS animation
  const [play, setPlay] = useState(0)
  return (
    <Link
      to="/"
      onClick={onClick}
      onMouseEnter={() => setPlay((n) => n + 1)}
      className="flex items-end leading-none"
      aria-label="FashionFit home"
    >
      <span key={play} className="logo-anim flex items-end">
        <LogoMark light={light} className="h-11 w-11 shrink-0" />
        <span className={`-ml-4 translate-y-[0.2em] font-display text-[1.55rem] font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          {WORD.map((ch, i) => (
            <span key={i} className="logo-letter inline-block" style={{ animationDelay: `${0.35 + i * 0.05}s` }}>
              {ch}
            </span>
          ))}
        </span>
      </span>
    </Link>
  )
}
