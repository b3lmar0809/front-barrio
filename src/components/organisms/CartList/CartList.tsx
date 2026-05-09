/**
 * CartList organism
 *
 * @version 1.0.0 - 07 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 07 may. 2026
 *
 **/
import React from 'react'
import type { CartItem as CartItemType } from '../../../hooks/useCart'
import CartItem from '../../molecules/CartItem/CartItem'
import { formatCLP } from '../../../utils/formatters'
import styles from './CartList.module.css'

interface CartListProps {
    items: CartItemType[]
    onRemove: (productId: number) => void
    onQuantityChange: (productId: number, quantity: number) => void
    total: number
}

const CartList: React.FC<CartListProps> = ({ items, onRemove, onQuantityChange, total }) => {
    if (items.length === 0) {
        return (
            <div className={styles.empty}>
                <p>El carrito está vacio</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Codigo</span>
                <span>Producto</span>
                <span>Cant.</span>
                <span>Precio unit.</span>
                <span>Subtotal</span>
                <span />
            </div>

            <div className={styles.list}>
                {items.map((item) => (
                    <CartItem
                        key={item.productId}
                        item={item}
                        onRemove={onRemove}
                        onQuantityChange={onQuantityChange}
                    />
                ))}
            </div>

            <div className={styles.footer}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>{formatCLP(total)}</span>
            </div>
        </div>
    )
}

export default CartList
