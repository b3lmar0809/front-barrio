/**
 * CategoryChipsSkeleton
 * @Version: 1.0.0 - 26 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 26 jun. 2026
 */
import React from 'react'
import Skeleton from '../../atoms/Skeleton/Skeleton'
import styles from './CategoryChipsSkeleton.module.css'

const WIDTHS = [88, 72, 110, 96, 76, 104, 80]

const CategoryChipsSkeleton: React.FC = () => (
    <div className={styles.chips}>
        {WIDTHS.map((w, i) => (
            <Skeleton key={i} width={w} height={30} className={styles.chip} />
        ))}
    </div>
)

export default CategoryChipsSkeleton
