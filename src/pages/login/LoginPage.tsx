/**
 * LoginPage class
 * @Version: 1.0.0 - 04 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 04 may. 2026
 */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthTemplate from '../../components/templates/AuthTemplate/AuthTemplate'
import LoginForm from '../../components/organisms/LoginForm/LoginForm'
import { loginUser } from '../../api/AuthApi'
import type { LoginRequest } from '../../api/AuthApi'
import { setUser } from '../../app/Store'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useAppSelector((s) => s.user.isAuthenticated)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard', { replace: true })
    }, [isAuthenticated, navigate])

    const handleSubmit = async (data: LoginRequest) => {
        setIsLoading(true)
        setError(undefined)
        try {
            const user = await loginUser(data)
            dispatch(setUser(user))
            navigate('/dashboard')
        } catch {
            setError('Email o contraseña incorrectos.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthTemplate variant="split">
            <LoginForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
            />
        </AuthTemplate>
    )
}

export default LoginPage
