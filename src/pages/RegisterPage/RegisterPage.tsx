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
import { Rocket, Smartphone, Gift } from 'lucide-react'
import { registerUser } from '../../api/AuthApi'
import type { RegisterRequest } from '../../api/AuthApi'
import { setUser } from '../../app/Store'
import { useAppDispatch } from '../../app/hooks'

const registerBenefits = [
    { icon: <Rocket size={18} color="#9FE1CB" />, text: 'Configúralo en minutos' },
    { icon: <Smartphone size={18} color="#9FE1CB" />, text: 'Desde tu celular o computador' },
    { icon: <Gift size={18} color="#9FE1CB" />, text: 'Plan gratis para empezar' },
]

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
        <AuthTemplate
            variant="split"
            slogan="Crea tu cuenta y empieza a digitalizar tu almacén hoy."
            benefits={registerBenefits}
        >
            <RegisterForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
            />
        </AuthTemplate>
    )
}

export default RegisterPage
