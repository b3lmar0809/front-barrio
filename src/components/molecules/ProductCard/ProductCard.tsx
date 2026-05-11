/**
 * ProductCard molecule
 *
 * @version 1.0.0 - 09 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 09 may. 2026
 *
 **/
import React from 'react'
import type { Product } from '../../organisms/ProductTable/ProductTable'
import Badge from '../../atoms/Badge/Badge'
import { DeleteIcon } from '../../atoms/icon/Icon'
import { formatCLP } from '../../../utils/formatters'
import styles from './ProductCard.module.css'

interface ProductCardProps {
    product: Product
    onDelete: (id: number) => void
}

function getStockVariant(stock: number, minStock: number): 'danger' | 'warning' | 'success' {
    if (stock < minStock) return 'danger'
    if (stock <= minStock + 2) return 'warning'
    return 'success'
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
    const stockVariant = getStockVariant(product.stock, product.minStock)

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.name}>{product.name}</span>
                <button
                    className={styles.deleteBtn}
                    onClick={() => onDelete(product.id)}
                    aria-label="Eliminar producto"
                >
                    <DeleteIcon size={16} />
                </button>
            </div>

            <div className={styles.body}>
                <div className={styles.row}>
                    <span className={styles.label}>Categoría</span>
                    <span className={styles.value}>{product.category}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Precio venta</span>
                    <span className={styles.value}>{formatCLP(product.salePrice)}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Stock</span>
                    <Badge
                        text={String(product.stock)}
                        variant={stockVariant}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCard