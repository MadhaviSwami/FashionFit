import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout, { Field } from '../components/AuthLayout.jsx'
import Alert from '../components/Alert.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { validateEmail, validateName, validatePassword } from '../services/validation.js'

export default function Signup() {
  const { user, signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/profile'

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', agree: false })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to={redirectTo} replace />

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    setErrors({ ...errors, [name]: '' })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirm: form.confirm !== form.password ? 'Passwords do not match.' : '',
      agree: form.agree ? '' : 'Please accept the Privacy Policy to continue.',
    }
    setErrors(next)
    if (Object.values(next).some(Boolean)) return
    setSubmitting(true)
    setServerError('')
    try {
      await signup(form.name.trim(), form.email.trim(), form.password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Create an account to keep a history of your AI try-ons.">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {serverError && <Alert type="error">{serverError}</Alert>}
        <Field label="Full name" id="name" name="name" autoComplete="name" value={form.name} onChange={onChange} error={errors.name} />
        <Field label="Email" id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} error={errors.email} />
        <Field
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters, with a letter and a number"
          value={form.password}
          onChange={onChange}
          error={errors.password}
        />
        <Field
          label="Confirm password"
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={onChange}
          error={errors.confirm}
        />
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/70">
            <input type="checkbox" name="agree" checked={form.agree} onChange={onChange} className="mt-0.5 h-4 w-4 accent-blush-500" />
            <span>
              I have read the{' '}
              <Link to="/privacy" className="font-medium text-blush-600 underline" target="_blank">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.agree && <p className="mt-1 text-xs text-red-600">{errors.agree}</p>}
        </div>
        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-ink/60">
        Already have an account?{' '}
        <Link to="/login" state={location.state} className="font-semibold text-blush-600 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
