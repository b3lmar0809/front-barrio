/**
 *CartItem class
 *
 * @version 1.0.0 - 07 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 07 may. 2026
 *
 **/
import React from 'react'
import type { CartItem as CartItemType } from '../../../hooks/useCart'
import { formatCLP } from '../../../utils/formatters'
import { DeleteIcon } from '../../atoms/icon/Icon'
import styles from './CartItem.module.css'

interface CartItemProps {
    item: CartItemType
    onRemove: (productId: number) => void
    onQuantityChange: (productId: number, quantity: number) => void
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onQuantityChange }) => {
    const handleDecrease = () => {
        if (item.quantity <= 1) {
            onRemove(item.productId)
        } else {
            onQuantityChange(item.productId, item.quantity - 1)
        }
    }

    const handleIncrease = () => {
        onQuantityChange(item.productId, item.quantity + 1)
    }

    return (
        <div className={styles.row}>
            <div className={styles.info}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.unitPrice}>{formatCLP(item.unitPrice)} c/u</span>
            </div>

            <div className={styles.qtyControl}>
                <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={handleDecrease}
                    aria-label="Disminuir cantidad"
                >
                    −
                </button>
                <span className={styles.qtyNum}>{item.quantity}</span>
                <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={handleIncrease}
                    aria-label="Aumentar cantidad"
                >
                    +
                </button>
            </div>

            <span className={styles.subtotal}>{formatCLP(item.subtotal)}</span>

            <button
                type="button"
                className={styles.removeBtn}
                onClick={() => onRemove(item.productId)}
                aria-label="Eliminar del carrito"
            >
                <DeleteIcon size={15} />
            </button>
        </div>
    )
}

export default CartItem