/**
 * TopProductsTable class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React from 'react'
import type { ProductStats } from '../../../api/ReportApi'
import { formatCLP, capitalize } from '../../../utils/formatters'
import styles from './TopProductsTable.module.css'

interface TopProductsTableProps {
    products: ProductStats[]
}

const TopProductsTable: React.FC<TopProductsTableProps> = ({ products }) => {
    if (products.length === 0) {
        return <p className={styles.empty}>Sin ventas este mes.</p>
    }

    return (
        <div className={styles.list} role="list">
            {products.map((p) => (
                <div key={p.productId} className={styles.row} role="listitem">
                    <span
                        className={`${styles.rank} ${p.rankingVentas === 1 ? styles.rankFirst : ''}`}
                        aria-label={`Posición ${p.rankingVentas}`}
                    >
                        {p.rankingVentas}
                    </span>
                    <span className={styles.name}>{capitalize(p.productName)}</span>
                    <div className={styles.meta}>
                        <span className={styles.units}>{p.totalSold} uds</span>
                        <span className={styles.revenue}>{formatCLP(p.totalRevenue)}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TopProductsTable
