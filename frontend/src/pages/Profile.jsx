import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Download, History, LogOut, Pencil, Trash2 } from 'lucide-react'
import EmptyState from '../components/EmptyState.jsx'
import Alert from '../components/Alert.jsx'
import Spinner from '../components/Spinner.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { deleteHistory, getHistory, getHistoryImageBlob } from '../services/userDataService.js'
import { validateName } from '../services/validation.js'

function TryOnHistory({ token }) {
  const [state, setState] = useState({ loading: true, items: [], error: '' })

  const load = useCallback(() => {
    getHistory(token)
      .then((data) => setState({ loading: false, items: data.history, error: '' }))
      .catch((err) => setState({ loading: false, items: [], error: err.message }))
  }, [token])

  useEffect(load, [load])

  const remove = async (id) => {
    if (!window.confirm('Delete this try-on result permanently?')) return
    try {
      await deleteHistory(token, id)
      setState((s) => ({ ...s, items: s.items.filter((i) => i.id !== id) }))
    } catch (err) {
      setState((s) => ({ ...s, error: err.message }))
    }
  }

  const download = async (item) => {
    try {
      const blob = await getHistoryImageBlob(token, item.id)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `fashion-fit-${item.productId}-${item.id}.jpg`
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (err) {
      setState((s) => ({ ...s, error: err.message }))
    }
  }

  if (state.loading) return <Spinner label="Loading your try-on history..." />
  return (
    <div className="space-y-4">
      {state.error && <Alert type="error">{state.error}</Alert>}
      {state.items.length === 0 ? (
        <EmptyState
          icon={History}
          title="No saved try-ons"
          text='Results are only saved when you tick "Save the generated result to my try-on history" on the try-on page.'
          action={
            <Link to="/try-on" className="btn-primary">
              Go to Virtual Try-On
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {state.items.map((item) => (
            <figure key={item.id} className="overflow-hidden rounded-3xl border border-ink/5 bg-white">
              <img src={item.thumbnail} alt={`Try-on of ${item.productName}`} className="aspect-[3/4] w-full object-cover" />
              <figcaption className="space-y-2 p-3">
                <p className="truncate text-sm font-medium">{item.productName}</p>
                <p className="text-xs text-ink/50">{new Date(item.createdAt.replace(' ', 'T') + 'Z').toLocaleString()}</p>
                <div className="flex gap-2">
                  <button type="button" className="btn-outline btn-sm flex-1" onClick={() => download(item)} aria-label="Download">
                    <Download className="h-4 w-4" />
                  </button>
                  <button type="button" className="btn-outline btn-sm flex-1 hover:!border-red-400 hover:!text-red-600" onClick={() => remove(item.id)} aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Profile() {
  const { user, token, logout, updateName, deleteAccount } = useAuth()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [nameError, setNameError] = useState('')
  const [message, setMessage] = useState(null)

  const saveName = async (e) => {
    e.preventDefault()
    const problem = validateName(name)
    if (problem) return setNameError(problem)
    try {
      await updateName(name.trim())
      setEditing(false)
      setMessage({ type: 'success', text: 'Your name was updated.' })
    } catch (err) {
      setNameError(err.message)
    }
  }

  const onDelete = async () => {
    if (!window.confirm('Delete your account and all saved try-on results? This cannot be undone.')) return
    try {
      await deleteAccount()
      navigate('/', { replace: true })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    }
  }

  return (
    <div className="container-page py-10">
      <section className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-5">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-blush-200 font-display text-2xl font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div>
            {editing ? (
              <form onSubmit={saveName} className="flex flex-wrap items-start gap-2">
                <div>
                  <input
                    className={`input !py-2 ${nameError ? 'input-error' : ''}`}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setNameError('')
                    }}
                    aria-label="Your name"
                    autoFocus
                  />
                  {nameError && <p className="mt-1 text-xs text-red-600">{nameError}</p>}
                </div>
                <button type="submit" className="btn-primary btn-sm">Save</button>
                <button type="button" className="btn-outline btn-sm" onClick={() => { setEditing(false); setName(user.name) }}>
                  Cancel
                </button>
              </form>
            ) : (
              <h1 className="flex items-center gap-2 text-2xl font-semibold sm:text-3xl">
                {user.name}
                <button type="button" onClick={() => setEditing(true)} className="rounded-full p-1.5 text-ink/40 hover:bg-blush-50 hover:text-ink cursor-pointer" aria-label="Edit name">
                  <Pencil className="h-4 w-4" />
                </button>
              </h1>
            )}
            <p className="text-sm text-ink/60">{user.email}</p>
            <p className="text-xs text-ink/40">Member since {new Date(user.created_at.replace(' ', 'T') + 'Z').toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-outline btn-sm" onClick={() => { logout(); navigate('/') }}>
            <LogOut className="h-4 w-4" /> Log out
          </button>
          <button type="button" className="btn-outline btn-sm hover:!border-red-400 hover:!text-red-600" onClick={onDelete}>
            <Trash2 className="h-4 w-4" /> Delete account
          </button>
        </div>
      </section>

      {message && <Alert type={message.type} className="mt-4">{message.text}</Alert>}

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <History className="h-6 w-6 text-blush-500" /> Try-on history
        </h2>
        <p className="mt-1 text-sm text-ink/60">Results you chose to save from the Virtual Try-On page.</p>
        <div className="mt-6">
          <TryOnHistory token={token} />
        </div>
      </section>
    </div>
  )
}
