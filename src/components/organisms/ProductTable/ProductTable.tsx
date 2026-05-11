/**
 * ProductTable organism
 *
 * @version 1.0.0 - 09 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 09 may. 2026
 *
 **/
import React from 'react'
import Badge from '../../atoms/Badge/Badge'
import Button from '../../atoms/Button/Button'
import { formatCLP } from '../../../utils/formatters'
import styles from './ProductTable.module.css'

export interface Product {
    id: number
    name: string
    category: string
    barcode: string
    salePrice: number
    unitCost: number
    stock: number
    minStock: number
}

interface ProductTableProps {
    products: Product[]
    onDelete: (id: number) => void
    onEdit: (product: Product) => void
}

function getStockVariant(stock: number, minStock: number): 'danger' | 'warning' | 'success' {
    if (stock < minStock) return 'danger'
    if (stock <= minStock + 2) return 'warning'
    return 'success'
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onDelete, onEdit }) => {
    if (products.length === 0) {
        return (
            <div className={styles.empty}>
                <p>No hay productos registrados</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Nombre</span>
                <span>Categoría</span>
                <span>Cód. barras</span>
                <span>Precio venta</span>
                <span>Costo unit.</span>
                <span>Ganancia</span>
                <span>Stock</span>
                <span>Stock mín.</span>
                <span>Acciones</span>
            </div>

            <div className={styles.body}>
                {products.map((product) => {
                    const profit = product.salePrice - product.unitCost
                    const stockVariant = getStockVariant(product.stock, product.minStock)

                    return (
                        <div key={product.id} className={styles.row}>
                            <span className={styles.name}>{product.name}</span>
                            <span>{product.category}</span>
                            <span className={styles.mono}>{product.barcode}</span>
                            <span>{formatCLP(product.salePrice)}</span>
                            <span>{formatCLP(product.unitCost)}</span>
                            <span className={profit >= 0 ? styles.profitPositive : styles.profitNegative}>
                                {formatCLP(profit)}
                            </span>
                            <span>
                                <Badge
                                    text={String(product.stock)}
                                    variant={stockVariant}
                                />
                            </span>
                            <span>{product.minStock}</span>
                            <div className={styles.actions}>
                                <Button
                                    label="Editar"
                                    variant="secondary"
                                    onClick={() => onEdit(product)}
                                />
                                <Button
                                    label="Eliminar"
                                    variant="danger"
                                    onClick={() => onDelete(product.id)}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductTable