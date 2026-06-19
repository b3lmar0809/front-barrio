/**
 * Input class
 * @Version: 1.0.0 - 03 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 03 may. 2026
 */
import React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import styles from './Input.module.css'

interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    error?: string
    name?: string
    id?: string
    icon?: React.ReactNode
    onTogglePassword?: () => void
    showPassword?: boolean
    maxLength?: number
}

const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    disabled = false,
    error,
    name,
    id,
    icon,
    onTogglePassword,
    showPassword,
    maxLength,
}) => {
    const actualType = type === 'password' && showPassword ? 'text' : type

    const inputClass = [
        styles.input,
        icon ? styles.inputWithIcon : '',
        onTogglePassword ? styles.inputWithToggle : '',
        error ? styles.inputError : '',
    ].filter(Boolean).join(' ')

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputWrapper}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <input
                    className={inputClass}
                    type={actualType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    name={name}
                    id={id}
                    maxLength={maxLength}
                />
                {onTogglePassword && (
                    <button
                        type="button"
                        className={styles.toggleBtn}
                        onClick={onTogglePassword}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
            {error && <span className={styles.errorMsg}>{error}</span>}
        </div>
    )
}

export default Input
