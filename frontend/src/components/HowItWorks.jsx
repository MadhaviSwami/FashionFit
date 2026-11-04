import { Camera, Download, Shirt, Wand2 } from 'lucide-react'

const STEPS = [
  {
    icon: Camera,
    title: 'Add your photo',
    text: 'Upload a front-facing photo or take one with your camera. Good light and a plain background help.',
  },
  {
    icon: Shirt,
    title: 'Pick an outfit',
    text: 'Choose one of our sample garments, or upload a photo of any clothing you want to try on.',
  },
  {
    icon: Wand2,
    title: 'AI generates your look',
    text: 'A diffusion-based try-on model (IDM-VTON) redraws the garment on your body, following your pose and shape.',
  },
  {
    icon: Download,
    title: 'Compare & download',
    text: 'Slide between your original photo and the result, try other items, and download the ones you love.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="container-page py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Virtual try-on in four steps</h2>
        <p className="mt-4 text-ink/60">
          Unlike a simple image overlay, an AI try-on model regenerates the clothing so it fits your pose, body
          shape and lighting.
        </p>
      </div>
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <li
            key={title}
            className="group relative rounded-3xl border border-ink/5 bg-gradient-to-b from-blush-50 to-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blush-100"
          >
            <span className="absolute right-5 top-4 font-display text-5xl font-semibold text-blush-200 transition group-hover:text-blush-300">
              {i + 1}
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-blush-300">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-sans text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
