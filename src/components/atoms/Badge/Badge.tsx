/**
 * Badge class
 * @Version: 1.0.0 - 06 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 06 may. 2026
 */
import React from 'react'
import styles from './Badge.module.css'

interface BadgeProps {
    text: string
    variant: 'success' | 'warning' | 'danger' | 'info' | 'category' | 'neutral'
}

const Badge: React.FC<BadgeProps> = ({ text, variant }) => {
    return (
        <span className={`${styles.badge} ${styles[variant]}`}>
            {text}
        </span>
    )
}

export default Badge
