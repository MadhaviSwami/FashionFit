import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout, { Field } from '../components/AuthLayout.jsx'
import Alert from '../components/Alert.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { validateEmail } from '../services/validation.js'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/profile'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to={redirectTo} replace />

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = { email: validateEmail(form.email), password: form.password ? '' : 'Password is required.' }
    setErrors(next)
    if (next.email || next.password) return
    setSubmitting(true)
    setServerError('')
    try {
      await login(form.email.trim(), form.password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to see your saved try-on history.">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {serverError && <Alert type="error">{serverError}</Alert>}
        <Field label="Email" id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} error={errors.email} />
        <Field
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={onChange}
          error={errors.password}
        />
        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-ink/60">
        New to Fashion Fit?{' '}
        <Link to="/signup" state={location.state} className="font-semibold text-blush-600 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}
