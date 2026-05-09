/**
 * useCart class
 *
 * @version 1.0.0 - 07 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 07 may. 2026
 *
 **/
import { useState, useCallback, useMemo } from 'react'

export interface CartItem {
    productId: number
    name: string
    barcode: string
    quantity: number
    unitPrice: number
    subtotal: number
}

interface UseCartReturn {
    cart: CartItem[]
    addItem: (product: Omit<CartItem, 'quantity' | 'subtotal'>) => void
    removeItem: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
    total: number
    itemCount: number
}

export const useCart = (): UseCartReturn => {
    const [cart, setCart] = useState<CartItem[]>([])

    // Si el producto ya esta en el carrito le suma 1, si no lo agrega con quantity: 1
    const addItem = useCallback((product: Omit<CartItem, 'quantity' | 'subtotal'>) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.productId === product.productId)
            if (existing) {
                return prev.map((item) =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.unitPrice }
                        : item
                )
            }
            return [...prev, { ...product, quantity: 1, subtotal: product.unitPrice }]
        })
    }, [])

    // Elimina el item del carrito por su productId
    const removeItem = useCallback((productId: number) => {
        setCart((prev) => prev.filter((item) => item.productId !== productId))
    }, [])

    // Actualiza la cantidad; si llega a 0 o menos, elimina el item
    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity <= 0) {
            setCart((prev) => prev.filter((item) => item.productId !== productId))
            return
        }
        setCart((prev) =>
            prev.map((item) =>
                item.productId === productId
                    ? { ...item, quantity, subtotal: quantity * item.unitPrice }
                    : item
            )
        )
    }, [])

    // Vacia el carrito por completo
    const clearCart = useCallback(() => setCart([]), [])

    // Suma de todos los subtotales
    const total = useMemo(
        () => cart.reduce((sum, item) => sum + item.subtotal, 0),
        [cart]
    )

    // Total de unidades en el carrito (no de productos distintos)
    const itemCount = useMemo(
        () => cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]
    )

    return { cart, addItem, removeItem, updateQuantity, clearCart, total, itemCount }
}
