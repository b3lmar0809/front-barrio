/**
 * Button class
 * @Version: 1.0.0 - 03 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 03 may. 2026
 */
import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
    label: string
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'danger' | 'green'
    disabled?: boolean
    isLoading?: boolean
    type?: 'button' | 'submit' | 'reset'
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    variant = 'primary',
    disabled = false,
    isLoading = false,
    type = 'button',
    className,
}) => {
    return (
        <button
            className={`${styles.btn} ${styles[variant]}${className ? ` ${className}` : ''}`}
            onClick={onClick}
            disabled={disabled || isLoading}
            type={type}
        >
            {isLoading ? <span className={styles.spinner} /> : label}
        </button>
    )
}

export default Button
