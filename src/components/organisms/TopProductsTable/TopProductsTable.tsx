/**
 * TopProductsTable class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React from 'react'
import type { ProductStats } from '../../../api/ReportApi'
import { formatCLP } from '../../../utils/formatters'
import styles from './TopProductsTable.module.css'

interface TopProductsTableProps {
    products: ProductStats[]
}

const TopProductsTable: React.FC<TopProductsTableProps> = ({ products }) => {
    if (products.length === 0) {
        return <p className={styles.empty}>Sin ventas este mes.</p>
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Unidades vendidas</th>
                    <th>Total generado</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p) => (
                    <tr key={p.productId}>
                        <td>{p.rankingVentas}</td>
                        <td>{p.productName}</td>
                        <td>{p.totalSold}</td>
                        <td>{formatCLP(p.totalRevenue)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TopProductsTable
