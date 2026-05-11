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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
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
            />
            <FormField
                label="Contraseña"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
