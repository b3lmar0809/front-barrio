/**
 * BenefitItem class
 * @Version: 1.0.0 - 15 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 15 jun. 2026
 */
import React from 'react'
import styles from './BenefitItem.module.css'

interface BenefitItemProps {
    icon: React.ReactNode
    text: string
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, text }) => (
    <div className={styles.item}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.text}>{text}</span>
    </div>
)

export default BenefitItem
