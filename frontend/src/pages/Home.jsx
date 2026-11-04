import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Ruler, ShieldCheck, Sparkles, Wand2, Zap } from 'lucide-react'
import HowItWorks from '../components/HowItWorks.jsx'

const FEATURES = [
  {
    to: '/try-on',
    icon: Wand2,
    title: 'AI Virtual Try-On',
    text: 'Upload your photo or use your camera, then try a sample garment or a photo of any clothing you like.',
    cta: 'Try it now',
    tint: 'from-blush-100 to-white',
  },
  {
    to: '/body-shape',
    icon: Ruler,
    title: 'Body Shape Calculator',
    text: 'Enter a few measurements to find your body shape, with photo do\'s and don\'ts for tops, bottoms, kurtis and sarees.',
    cta: 'Find my shape',
    tint: 'from-amber-50 to-blush-50',
  },
  {
    to: '/style-handbook',
    icon: BookOpen,
    title: 'Style Handbook',
    text: 'Saree fabrics and drapes, blouse necklines, colour and skin tone, men\'s ethnic wear and quick cheat sheets.',
    cta: 'Read the handbook',
    tint: 'from-slate-100 to-white',
  },
]

const HERO_ITEMS = [
  { src: '/style-guide/my-photos/wrap-top.jpg', cls: 'left-0 top-14 w-36 sm:w-44', tilt: '-6deg', delay: '0s' },
  { src: '/style-guide/my-photos/yoke-kurti.jpg', cls: 'left-1/2 top-0 w-40 -translate-x-1/2 sm:w-52', tilt: '0deg', delay: '1s' },
  { src: '/style-guide/my-photos/sweetheart-top.jpg', cls: 'right-0 top-16 w-36 sm:w-44', tilt: '6deg', delay: '2s' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blush-50 via-white to-blush-100">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blush-200/50 blur-3xl" />
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold shadow-sm">
              <Sparkles className="h-4 w-4 text-blush-500" /> AI virtual try-on
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Your Style, <span className="italic text-blush-500">Your Way.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink/60">Discover your look with AI-powered virtual fashion.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/try-on" className="btn-primary !px-8 !py-4 text-base">
                Try It Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/body-shape" className="btn-outline !px-8 !py-4 text-base">
                Find Your Body Shape
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-ink/60">
              <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-blush-500" /> Results in about a minute</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-blush-500" /> Photos not stored</span>
            </div>
          </div>

          <div className="relative mx-auto h-[360px] w-full max-w-lg sm:h-[440px]" aria-hidden="true">
            <div className="absolute inset-x-6 bottom-0 top-16 rounded-[3rem] bg-white/70 shadow-xl shadow-blush-200/60" />
            {HERO_ITEMS.map((item) => (
              <img
                key={item.src}
                src={item.src}
                alt=""
                className={`absolute aspect-[3/4] animate-float rounded-3xl border-4 border-white object-cover object-top shadow-xl ${item.cls}`}
                style={{ '--tilt': item.tilt, animationDelay: item.delay }}
              />
            ))}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm text-white shadow-lg">
              <Sparkles className="h-4 w-4 text-blush-300" /> Try on any outfit with AI
            </div>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="container-page py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">What you can do</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Discover what suits you</h2>
          <p className="mt-3 text-ink/60">
            See outfits on yourself with AI, learn your body shape, and get practical styling advice for Indian and
            western wear.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {FEATURES.map(({ to, icon: Icon, title, text, cta, tint }) => (
            <Link
              key={to}
              to={to}
              className={`group flex flex-col rounded-3xl bg-gradient-to-br ${tint} p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blush-100`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-blush-300">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{text}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blush-600">
                {cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <HowItWorks />

      {/* Body shape teaser */}
      <section className="container-page pb-20">
        <div className="grid items-center gap-8 rounded-[2.5rem] border border-blush-200 bg-gradient-to-r from-blush-50 to-white p-8 sm:p-12 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">Body shape calculator</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Know your shape, dress your best</h2>
            <p className="mt-3 max-w-xl text-ink/60">
              Enter your shoulder, bust, waist and hip measurements to discover your body shape, with saree, ethnic,
              office and casual advice made for your proportions.
            </p>
          </div>
          <Link to="/body-shape" className="btn-primary !px-8 !py-4 text-base">
            Find my shape <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-14 text-center text-white sm:px-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blush-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blush-300/20 blur-3xl" />
          <h2 className="relative text-3xl font-semibold sm:text-4xl">Ready to see it on you?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/70">
            Upload a photo or use your camera, pick a sample garment or upload your own, and let AI do the rest.
          </p>
          <Link to="/try-on" className="btn-pink relative mt-8 !px-8 !py-4 text-base">
            Start Virtual Try-On <Sparkles className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
