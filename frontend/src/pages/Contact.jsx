import { useState } from 'react'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { Field } from '../components/AuthLayout.jsx'
import Alert from '../components/Alert.jsx'
import { sendContactMessage } from '../services/userDataService.js'
import { validateEmail, validateName } from '../services/validation.js'

const EMPTY = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', text: '' })

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      message: form.message.trim().length < 10 ? 'Your message should be at least 10 characters.' : '',
    }
    setErrors(next)
    if (Object.values(next).some(Boolean)) return
    setStatus({ state: 'sending', text: '' })
    try {
      await sendContactMessage({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() })
      setForm(EMPTY)
      setStatus({ state: 'sent', text: "Thanks! Your message has been received. We'll get back to you soon." })
    } catch (err) {
      setStatus({ state: 'error', text: err.message })
    }
  }

  return (
    <div className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">We'd love to hear from you</h1>
        <p className="mt-4 text-ink/60">Questions, feedback or ideas for the collection? Send us a message.</p>
        <ul className="mt-10 space-y-5 text-sm">
          <li className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blush-100 text-blush-600"><Mail className="h-5 w-5" /></span>
            hello@fashionfit.example
          </li>
          <li className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blush-100 text-blush-600"><MessageCircle className="h-5 w-5" /></span>
            We usually reply within 2 working days
          </li>
          <li className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blush-100 text-blush-600"><MapPin className="h-5 w-5" /></span>
            Online only, available everywhere
          </li>
        </ul>
      </div>

      <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
        {status.state === 'sent' && <Alert type="success">{status.text}</Alert>}
        {status.state === 'error' && <Alert type="error">{status.text}</Alert>}
        <Field label="Name" id="name" name="name" autoComplete="name" value={form.name} onChange={onChange} error={errors.name} />
        <Field label="Email" id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} error={errors.email} />
        <div>
          <label htmlFor="message" className="label">Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            maxLength={5000}
            className={`input resize-y ${errors.message ? 'input-error' : ''}`}
            value={form.message}
            onChange={onChange}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
        </div>
        <button type="submit" className="btn-primary w-full" disabled={status.state === 'sending'}>
          {status.state === 'sending' ? 'Sending...' : 'Send message'}
        </button>
      </form>
    </div>
  )
}
