/**
 * Label class
 * @Version: 1.0.0 - 03 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 03 may. 2026
 */
import React from 'react'
import styles from './Label.module.css'

interface LabelProps {
    text: string
    htmlFor?: string
    required?: boolean
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, required = false }) => {
    return (
        <label className={styles.label} htmlFor={htmlFor}>
            {text}
            {required && <span className={styles.required}>*</span>}
        </label>
    )
}

export default Label
