/**
 * RegisterForm class
 * @Version: 1.1.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 06 may. 2026
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../../molecules/FormField/FormField'
import Button from '../../atoms/Button/Button'
import { Mail, Lock } from 'lucide-react'
import type { RegisterRequest } from '../../../api/AuthApi'
import styles from './RegisterForm.module.css'

const formatRut = (value: string): string => {
    const clean = value.replace(/[^0-9kK]/g, '').toUpperCase()
    if (clean.length <= 1) return clean
    const verifier = clean.slice(-1)
    const body = clean.slice(0, -1)
    const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return `${formatted}-${verifier}`
}

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
    const [name,         setName]         = useState('')
    const [lastName,     setLastName]     = useState('')
    const [email,        setEmail]        = useState('')
    const [password,     setPassword]     = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [companyName,  setCompanyName]  = useState('')
    const [rut,          setRut]          = useState('')
    const [errors,       setErrors]       = useState<{
        name?: string
        email?: string
        password?: string
        companyName?: string
    }>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: { name?: string; email?: string; password?: string; companyName?: string } = {}

        if (!name.trim()) {
            newErrors.name = 'El nombre es obligatorio'
        } else if (name.trim().length < 3) {
            newErrors.name = 'El nombre debe tener al menos 3 caracteres'
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(name.trim())) {
            newErrors.name = 'El nombre solo puede contener letras y espacios'
        }

        if (!email.trim()) {
            newErrors.email = 'El email es obligatorio'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Ingresa un email válido'
        }

        if (!password) {
            newErrors.password = 'La contraseña es obligatoria'
        } else if (password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
        } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
            newErrors.password = 'La contraseña debe contener al menos una letra y un número'
        }

        if (!companyName.trim()) {
            newErrors.companyName = 'El nombre de la empresa es obligatorio'
        } else if (companyName.trim().length < 3) {
            newErrors.companyName = 'El nombre de la empresa debe tener al menos 3 caracteres'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        onSubmit({ name, lastName, email, password, companyName, rut })
    }

    const isDisabled = !name || !lastName || !email || !password || !companyName || !rut

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
                <h1 className={styles.formTitle}>Crear cuenta</h1>
                <p className={styles.formSubtitle}>Completa tus datos para empezar</p>
            </div>

            <div className={styles.row}>
                <FormField
                    label="Nombre"
                    name="name"
                    placeholder="Juan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    error={errors.name}
                />
                <FormField
                    label="Apellido"
                    name="lastName"
                    placeholder="Pérez"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>

            <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={errors.email}
                icon={<Mail size={16} color="#9ca3af" />}
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
                icon={<Lock size={16} color="#9ca3af" />}
                onTogglePassword={() => setShowPassword((p) => !p)}
                showPassword={showPassword}
            />

            <div className={styles.row}>
                <FormField
                    label="Nombre de la empresa"
                    name="companyName"
                    placeholder="Mi Empresa S.A."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    error={errors.companyName}
                />
                <FormField
                    label="RUT"
                    name="rut"
                    placeholder="12.345.678-9"
                    value={rut}
                    onChange={(e) => setRut(formatRut(e.target.value))}
                    required
                    maxLength={12}
                />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <Button
                label="Crear cuenta"
                type="submit"
                variant="green"
                isLoading={isLoading}
                disabled={isDisabled}
                className={styles.submitBtn}
            />
            <p className={styles.loginText}>
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className={styles.loginLink}>Inicia sesión</Link>
            </p>
        </form>
    )
}

export default RegisterForm
