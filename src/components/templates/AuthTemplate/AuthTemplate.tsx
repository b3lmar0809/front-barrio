/**
 * AuthTemplate class
 * @Version: 1.0.0 - 04 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 04 may. 2026
 */
import React from 'react'
import styles from './AuthTemplate.module.css'

interface AuthTemplateProps {
    children: React.ReactNode
    title: string
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({ children, title }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <p className={styles.logo}>
                        Barrio<span>App</span>
                    </p>
                    <h1 className={styles.title}>{title}</h1>
                </div>
                {children}
            </div>
        </div>
    )
}

export default AuthTemplate
