import React, { useEffect, useState } from 'react'
import AppRouter from './router/AppRouter'
import { getMe } from './api/AuthApi'
import { setUser } from './app/Store'
import { useAppDispatch } from './app/hooks'
import Spinner from './components/atoms/Spinner/Spinner'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    getMe()
      .then((user) => dispatch(setUser(user)))
      .catch(() => {/* sin sesión activa, no hacer nada */})
      .finally(() => setChecking(false))
  }, [dispatch])

  if (checking) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner size="lg" />
      </div>
    )
  }

  return <AppRouter />
}

export default App
