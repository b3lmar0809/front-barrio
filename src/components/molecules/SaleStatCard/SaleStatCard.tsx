/**
 * SaleStatCard
 *
 * @version 1.0.0 - 03 jun. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 03 jun. 2026
 */
import React from 'react'
import styles from './SaleStatCard.module.css'

interface SaleStatCardProps {
    icon: string
    title: string
    value: string
    subtitle?: string
}

const SaleStatCard: React.FC<SaleStatCardProps> = ({ icon, title, value, subtitle }) => (
    <div className={styles.card}>
        <span className={styles.icon}>{icon}</span>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
)

export default SaleStatCard