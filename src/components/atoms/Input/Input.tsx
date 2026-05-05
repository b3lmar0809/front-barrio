/**
 * Input class
 * @Version: 1.0.0 - 03 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 03 may. 2026
 */
import React from 'react'
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
}) => {
    return (
        <div className={styles.wrapper}>
            <input
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                name={name}
                id={id}
            />
            {error && <span className={styles.errorMsg}>{error}</span>}
        </div>
    )
}

export default Input
