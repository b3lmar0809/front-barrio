/**
 * Spinner class
 * @Version: 1.0.0 - 06 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 06 may. 2026
 */
import React from 'react'
import styles from './Spinner.module.css'

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    color?: string
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = '#4f46e5' }) => {
    return (
        <span
            className={`${styles.spinner} ${styles[size]}`}
            style={{ color }}
            role="status"
            aria-label="Cargando"
        />
    )
}

export default Spinner
