import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService.js'
import { readJSON, removeKey, writeJSON } from '../services/storage.js'

const AuthContext = createContext(null)
const SESSION_KEY = 'ff_session'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readJSON(SESSION_KEY, null))
  const [checking, setChecking] = useState(Boolean(session))

  const saveSession = useCallback((value) => {
    setSession(value)
    if (value) writeJSON(SESSION_KEY, value)
    else removeKey(SESSION_KEY)
  }, [])

  // Verify a stored token on page load (it may have expired).
  useEffect(() => {
    if (!session?.token) return
    let cancelled = false
    authService
      .fetchMe(session.token)
      .then((data) => !cancelled && saveSession({ token: session.token, user: data.user }))
      .catch((err) => {
        // Only log out when the server says the token is invalid, not when it is offline.
        if (!cancelled && err.status === 401) saveSession(null)
      })
      .finally(() => !cancelled && setChecking(false))
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = useCallback(
    async (email, password) => {
      const data = await authService.login(email, password)
      saveSession({ token: data.token, user: data.user })
      return data.user
    },
    [saveSession],
  )

  const signup = useCallback(
    async (name, email, password) => {
      const data = await authService.signup(name, email, password)
      saveSession({ token: data.token, user: data.user })
      return data.user
    },
    [saveSession],
  )

  const logout = useCallback(() => saveSession(null), [saveSession])

  const updateName = useCallback(
    async (name) => {
      const data = await authService.updateProfile(session.token, name)
      saveSession({ ...session, user: data.user })
    },
    [session, saveSession],
  )

  const deleteAccount = useCallback(async () => {
    await authService.deleteAccount(session.token)
    saveSession(null)
  }, [session, saveSession])

  const value = useMemo(
    () => ({
      user: session?.user || null,
      token: session?.token || null,
      checking,
      login,
      signup,
      logout,
      updateName,
      deleteAccount,
    }),
    [session, checking, login, signup, logout, updateName, deleteAccount],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
