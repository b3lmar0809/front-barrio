/**
 * ProductListSkeleton class
 * @Version: 1.0.0 - 18 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 18 jun. 2026
 */
import React from 'react'
import Skeleton from '../../atoms/Skeleton/Skeleton'
import styles from './ProductListSkeleton.module.css'

interface ProductListSkeletonProps {
    rows?: number
}

const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({ rows = 3 }) => (
    <div className={styles.list}>
        {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className={styles.row}>
                <Skeleton width={28} height={28} circle />
                <Skeleton width="50%" height={14} />
                <Skeleton width={80} height={14} />
            </div>
        ))}
    </div>
)

export default ProductListSkeleton
