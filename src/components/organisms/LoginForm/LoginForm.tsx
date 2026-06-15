/**
 * LoginForm class
 * @Version: 1.1.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 04 may. 2026
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../../molecules/FormField/FormField'
import Button from '../../atoms/Button/Button'
import type { LoginRequest } from '../../../api/AuthApi'
import styles from './LoginForm.module.css'

interface LoginFormProps {
    onSubmit: (data: LoginRequest) => void
    isLoading?: boolean
    error?: string
}

const LoginForm: React.FC<LoginFormProps> = ({
    onSubmit,
    isLoading = false,
    error,
}) => {
    const [email,    setEmail]    = useState('')
    const [password, setPassword] = useState('')
    const [errors,   setErrors]   = useState<{ email?: string; password?: string }>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: { email?: string; password?: string } = {}

        if (!email.trim()) {
            newErrors.email = 'El email es obligatorio'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Ingresa un email válido'
        }

        if (!password) {
            newErrors.password = 'La contraseña es obligatoria'
        } else if (password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        onSubmit({ email, password })
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={errors.email}
            />
            <FormField
                label="Contraseña"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={errors.password}
            />
            {error && <p className={styles.error}>{error}</p>}
            <Button
                label="Iniciar sesión"
                type="submit"
                isLoading={isLoading}
                disabled={!email || !password}
            />
            <p className={styles.registerText}>
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className={styles.registerLink}>Regístrate</Link>
            </p>
        </form>
    )
}

export default LoginForm
