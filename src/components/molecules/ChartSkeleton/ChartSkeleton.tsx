/**
 * ChartSkeleton class
 * @Version: 1.0.0 - 30 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 30 jun. 2026
 */
import React from 'react'
import Skeleton from '../../atoms/Skeleton/Skeleton'
import styles from './ChartSkeleton.module.css'

interface ChartSkeletonProps {
    circle?: boolean
    height?: number
}

const ChartSkeleton: React.FC<ChartSkeletonProps> = ({ circle = false, height = 240 }) => {
    if (circle) {
        return (
            <div className={styles.circleWrapper}>
                <Skeleton circle width={160} height={160} />
            </div>
        )
    }
    return <Skeleton width="100%" height={height} />
}

export default ChartSkeleton
