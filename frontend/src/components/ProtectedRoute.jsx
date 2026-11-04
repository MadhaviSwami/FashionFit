import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Spinner from './Spinner.jsx'

export default function ProtectedRoute({ children }) {
  const { user, checking } = useAuth()
  const location = useLocation()
  if (checking && !user) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <Spinner label="Checking your session..." />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}
