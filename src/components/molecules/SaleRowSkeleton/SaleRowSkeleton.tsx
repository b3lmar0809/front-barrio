/**
 * SaleRowSkeleton molecule
 * @Version: 1.0.0 - 29 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 29 jun. 2026
 */
import React from 'react'
import Skeleton from '../../atoms/Skeleton/Skeleton'
import styles from './SaleRowSkeleton.module.css'

const SaleRowSkeleton: React.FC = () => (
    <tr className={styles.row}>
        <td className={styles.cell}><Skeleton width={88} height={14} /></td>
        <td className={styles.cell}><Skeleton width={38} height={14} /></td>
        <td className={styles.cell}><Skeleton width={68} height={22} /></td>
        <td className={styles.cell}>
            <div className={styles.rightAlign}><Skeleton width={64} height={14} /></div>
        </td>
        <td className={styles.cell}>
            <div className={styles.centerAlign}><Skeleton width={14} height={14} /></div>
        </td>
    </tr>
)

export default SaleRowSkeleton
