/**
 * SaleDetailModal organism
 * @Version: 1.0.0 - 29 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 29 jun. 2026
 */
import React from 'react'
import { X } from 'lucide-react'
import type { SaleResponse } from '../../../api/SaleApi'
import Modal from '../../atoms/Modal/Modal'
import { formatCLP, formatDateShort, formatTime, capitalize } from '../../../utils/formatters'

const isValidAmount = (v: unknown): v is number =>
    typeof v === 'number' && Number.isFinite(v)
import styles from './SaleDetailModal.module.css'

interface SaleDetailModalProps {
    sale: SaleResponse
    onClose: () => void
}

const SaleDetailModal: React.FC<SaleDetailModalProps> = ({ sale, onClose }) => {
    const isCash = sale.paymentMethod === 'CASH'

    return (
        <Modal onClose={onClose} maxWidth={480}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h3 className={styles.title}>Detalle de venta</h3>
                    <p className={styles.subtitle}>
                        {formatDateShort(sale.date)} · {formatTime(sale.date)}
                    </p>
                </div>
                <button className={styles.close} onClick={onClose} aria-label="Cerrar">
                    <X size={18} />
                </button>
            </div>

            {/* Lista de productos */}
            <div className={styles.body}>
                <ul className={styles.itemList}>
                    {sale.items.map((item) => (
                        <li key={item.productId} className={styles.item}>
                            <span className={styles.itemName}>
                                {capitalize(item.productName)}
                                <span className={styles.itemQty}> × {item.quantity}</span>
                            </span>
                            <span className={styles.itemSubtotal}>{formatCLP(item.subtotal)}</span>
                        </li>
                    ))}
                </ul>

                {/* Bloque resumen */}
                <div className={styles.summary}>
                    <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>Método de pago</span>
                        <span className={isCash ? styles.pillCash : styles.pillCard}>
                            {isCash ? 'Efectivo' : 'Tarjeta'}
                        </span>
                    </div>

                    {isCash && (
                        <>
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Recibido</span>
                                {isValidAmount(sale.amountReceived)
                                    ? <span className={styles.summaryValue}>{formatCLP(sale.amountReceived)}</span>
                                    : <span className={styles.noData}>No registrado</span>
                                }
                            </div>
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Vuelto</span>
                                {isValidAmount(sale.change)
                                    ? <span className={styles.summaryValue}>{formatCLP(sale.change)}</span>
                                    : <span className={styles.noData}>No registrado</span>
                                }
                            </div>
                        </>
                    )}

                    <div className={styles.divider} />

                    <div className={styles.totalRow}>
                        <span className={styles.totalLabel}>Total</span>
                        <span className={styles.totalValue}>{formatCLP(sale.total)}</span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SaleDetailModal
