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
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10)
        if (!isNaN(val)) onQuantityChange(item.productId, val)
    }

    return (
        <div className={styles.row}>
            <span className={styles.barcode}>{item.barcode}</span>

            <span className={styles.name}>{item.name}</span>

            <input
                className={styles.qty}
                type="number"
                min={1}
                value={item.quantity}
                onChange={handleQuantityChange}
            />

            <span className={styles.price}>{formatCLP(item.unitPrice)}</span>

            <span className={styles.subtotal}>{formatCLP(item.subtotal)}</span>

            <button
                className={styles.removeBtn}
                onClick={() => onRemove(item.productId)}
                aria-label="Eliminar del carrito"
            >
                <DeleteIcon size={16} />
            </button>
        </div>
    )
}

export default CartItem