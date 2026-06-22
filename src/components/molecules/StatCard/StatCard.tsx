/**
 * StatCard class
 * @Version: 1.0.0 - 06 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 06 may. 2026
 */
import React from 'react'
import type { LucideIcon } from 'lucide-react'
import styles from './StatCard.module.css'

interface StatCardProps {
    title: string
    value: string | number
    Icon: LucideIcon
    iconBg: string
    iconColor: string
    period?: string
    suffix?: string
}

const StatCard: React.FC<StatCardProps> = ({ title, value, Icon, iconBg, iconColor, period, suffix }) => (
    <div className={styles.card}>
        <div className={styles.cardTop}>
            <span className={styles.title}>{title}</span>
            <div className={styles.iconCircle} style={{ backgroundColor: iconBg }}>
                <Icon size={16} color={iconColor} />
            </div>
        </div>
        <p className={styles.value}>
            {value}
            {suffix && <span className={styles.suffix}> {suffix}</span>}
        </p>
        {period && <p className={styles.period}>{period}</p>}
    </div>
)

export default StatCard
