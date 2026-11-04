import { Link } from 'react-router-dom'
import { Cpu, Heart, ShieldCheck } from 'lucide-react'

const VALUES = [
  {
    icon: Cpu,
    title: 'AI try-on',
    text: 'We use IDM-VTON, a published diffusion-based virtual try-on model, to redraw garments on your photo. We never paste a flat image on top and call it AI.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy first',
    text: 'Your photos are processed only to create your try-on and are not stored, unless you choose to save a result to your history.',
  },
  {
    icon: Heart,
    title: 'Style for everyone',
    text: "Men's, women's, casual and traditional wear in one place, so you can explore looks you might not have tried before.",
  },
]

export default function About() {
  return (
    <div className="container-page py-12">
      <section className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">About us</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Making fashion feel personal</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/60">
          Fashion Fit started with a simple question: <em>"How would this look on me?"</em> We combine AI virtual
          try-on with a body shape calculator and a practical style handbook, so you can preview outfits on your own
          photo and learn what flatters your shape. Nothing is sold on this site.
        </p>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl bg-blush-50 p-8 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blush-100">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-blush-300">
              <Icon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-sans text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-3xl rounded-3xl border border-ink/5 p-8 text-sm leading-relaxed text-ink/70">
        <h2 className="text-2xl font-semibold text-ink">About this project</h2>
        <p className="mt-4">
          Fashion Fit is a demonstration project built with React, Vite, Tailwind CSS and a Python Flask backend that
          uses Pillow and OpenCV for image processing and SQLite for accounts. It is not a shop: you can try on a
          small set of outfit photos, or upload a photo of any clothing you like.
        </p>
        <p className="mt-3">
          AI results are approximations. Fit, drape and colour on a real garment may differ.
        </p>
      </section>

      <div className="mt-12 text-center">
        <Link to="/try-on" className="btn-primary">Try it yourself</Link>
      </div>
    </div>
  )
}
