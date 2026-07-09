/**
 * KPICardSkeleton class
 * @Version: 1.0.0 - 18 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 18 jun. 2026
 */
import React from 'react'
import Skeleton from '../../atoms/Skeleton/Skeleton'
import styles from './KPICardSkeleton.module.css'

const KPICardSkeleton: React.FC = () => (
    <div className={styles.card}>
        <div className={styles.top}>
            <Skeleton width={60} height={13} />
            <Skeleton width={38} height={38} circle />
        </div>
        <Skeleton width={100} height={26} />
        <Skeleton width={70} height={12} />
    </div>
)

export default KPICardSkeleton
