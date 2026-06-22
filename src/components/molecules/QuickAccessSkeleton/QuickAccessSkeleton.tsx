/**
 * QuickAccessSkeleton class
 * @Version: 1.0.0 - 18 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 18 jun. 2026
 */
import React from 'react'
import Skeleton from '../../atoms/Skeleton/Skeleton'
import styles from './QuickAccessSkeleton.module.css'

const QuickAccessSkeleton: React.FC = () => (
    <div className={styles.container}>
        <Skeleton height={46} width="100%" className={styles.btn} />
        <Skeleton height={46} width="100%" className={styles.btn} />
        <Skeleton height={46} width="100%" className={styles.btn} />
    </div>
)

export default QuickAccessSkeleton
