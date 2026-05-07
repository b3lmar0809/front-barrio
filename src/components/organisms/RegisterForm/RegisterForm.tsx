/**
 * RegisterForm class
 * @Version: 1.0.0 - 06 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 06 may. 2026
 */
import React, { useState } from 'react'
import FormField from '../../molecules/FormField/FormField'
import Button from '../../atoms/Button/Button'
import type { RegisterRequest } from '../../../api/AuthApi'
import styles from './RegisterForm.module.css'

interface RegisterFormProps {
    onSubmit: (data: RegisterRequest) => void
    isLoading?: boolean
    error?: string
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    onSubmit,
    isLoading = false,
    error,
}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [rut, setRut] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ name, email, password, companyName, rut })
    }

    const isDisabled = !name || !email || !password || !companyName || !rut

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <FormField
                label="Nombre completo"
                name="name"
                placeholder="Juan Perez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
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
            <FormField
                label="Nombre de la empresa"
                name="companyName"
                placeholder="Mi Empresa S.A."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
            />
            <FormField
                label="RUT"
                name="rut"
                placeholder="12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                required
            />
            {error && <p className={styles.error}>{error}</p>}
            <Button
                label="Crear cuenta"
                type="submit"
                isLoading={isLoading}
                disabled={isDisabled}
            />
        </form>
    )
}

export default RegisterForm
