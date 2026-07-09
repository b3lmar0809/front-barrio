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
import styles from './CartList.module.css'

interface CartListProps {
    items: CartItemType[]
    onRemove: (productId: number) => void
    onQuantityChange: (productId: number, quantity: number) => void
}

const CartList: React.FC<CartListProps> = ({ items, onRemove, onQuantityChange }) => {
    if (items.length === 0) {
        return (
            <div className={styles.empty}>
                <p className={styles.emptyText}>El carrito está vacío</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {items.map((item) => (
                <CartItem
                    key={item.productId}
                    item={item}
                    onRemove={onRemove}
                    onQuantityChange={onQuantityChange}
                />
            ))}
        </div>
    )
}

export default CartList
