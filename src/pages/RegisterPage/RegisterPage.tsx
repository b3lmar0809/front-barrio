/**
 *RegisterPage class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthTemplate from '../../components/templates/AuthTemplate/AuthTemplate'
import RegisterForm from '../../components/organisms/RegisterForm/RegisterForm'
import { registerUser } from '../../api/AuthApi'
import type { RegisterRequest } from '../../api/AuthApi'
import { setUser } from '../../app/Store'
import { useAppDispatch } from '../../app/hooks'

const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)

    const handleSubmit = async (data: RegisterRequest) => {
        setIsLoading(true)
        setError(undefined)
        try {
            const user = await registerUser(data)
            dispatch(setUser(user))
            navigate('/dashboard')
        } catch (err: unknown) {
            const axiosErr = err as { response?: { data?: { message?: string } } }
            const msg = axiosErr?.response?.data?.message
            setError(msg ?? 'No se pudo crear la cuenta. Intenta nuevamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthTemplate title="Crear cuenta">
            <RegisterForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
            />
        </AuthTemplate>
    )
}

export default RegisterPage
