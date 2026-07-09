/**
 * SaleRow molecule
 * @Version: 1.0.0 - 29 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 29 jun. 2026
 */
import React from 'react'
import type { SaleResponse } from '../../../api/SaleApi'
import { formatCLP } from '../../../utils/formatters'
import { formatDateShort, formatTime } from '../../../utils/formatters'
import styles from './SaleRow.module.css'

interface SaleRowProps {
    sale: SaleResponse
    onClick: () => void
}

const SaleRow: React.FC<SaleRowProps> = ({ sale, onClick }) => {
    const isCash = sale.paymentMethod === 'CASH'
    return (
        <tr className={styles.row} onClick={onClick}>
            <td className={styles.cell}>{formatDateShort(sale.date)}</td>
            <td className={styles.cell}>{formatTime(sale.date)}</td>
            <td className={styles.cell}>
                <span className={isCash ? styles.pillCash : styles.pillCard}>
                    {isCash ? 'Efectivo' : 'Tarjeta'}
                </span>
            </td>
            <td className={`${styles.cell} ${styles.right}`}>
                <span className={styles.total}>{formatCLP(sale.total)}</span>
            </td>
            <td className={`${styles.cell} ${styles.chevronCell}`}>
                <span className={styles.chevron}>›</span>
            </td>
        </tr>
    )
}

export default SaleRow
