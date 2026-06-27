/**
 * ProductTable organism
 *
 * @version 1.0.0 - 09 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 09 may. 2026
 *
 **/
import React, { useState, useEffect } from 'react'
import { MoreVertical } from 'lucide-react'
import { formatCLP, capitalize } from '../../../utils/formatters'
import ProductRowSkeleton from '../../molecules/ProductRowSkeleton/ProductRowSkeleton'
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
    loading?: boolean
}

function getStockClass(stock: number, minStock: number): string {
    if (stock === 0)        return styles.stockDanger
    if (stock <= minStock)  return styles.stockWarning
    return styles.stockSuccess
}

const SKELETON_ROWS = 7

const TableHeader: React.FC = () => (
    <div className={styles.header}>
        <span>Nombre</span>
        <span>Categoría</span>
        <span>Cód. barras</span>
        <span className={styles.colRight}>Precio venta</span>
        <span className={styles.colRight}>Costo unit.</span>
        <span className={styles.colRight}>Ganancia</span>
        <span className={styles.colRight}>Stock</span>
        <span className={styles.colRight}>Stock mín.</span>
        <span></span>
    </div>
)

const ProductTable: React.FC<ProductTableProps> = ({ products, onDelete, onEdit, loading = false }) => {
    const [openMenuId, setOpenMenuId] = useState<number | null>(null)

    useEffect(() => {
        if (openMenuId === null) return
        const close = () => setOpenMenuId(null)
        document.addEventListener('click', close)
        return () => document.removeEventListener('click', close)
    }, [openMenuId])

    if (loading) {
        return (
            <div className={styles.container}>
                <TableHeader />
                <div className={styles.body}>
                    {Array.from({ length: SKELETON_ROWS }, (_, i) => (
                        <ProductRowSkeleton key={i} />
                    ))}
                </div>
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className={styles.empty}>
                <p>No hay productos registrados</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <TableHeader />

            <div className={styles.body}>
                {products.map((product) => {
                    const profit      = product.salePrice - product.unitCost
                    const isMenuOpen  = openMenuId === product.id
                    return (
                        <div key={product.id} className={styles.row}>
                            <span className={styles.name}>{capitalize(product.name)}</span>
                            <span>{capitalize(product.category)}</span>
                            <span className={`${styles.mono} ${!product.barcode ? styles.emptyCell : ''}`}>
                                {product.barcode || '—'}
                            </span>
                            <span className={styles.colRight}>{formatCLP(product.salePrice)}</span>
                            <span className={styles.colRight}>{formatCLP(product.unitCost)}</span>
                            <span className={`${styles.colRight} ${profit >= 0 ? styles.profitPositive : styles.profitNegative}`}>
                                {formatCLP(profit)}
                            </span>
                            <span className={styles.stockCell}>
                                <span className={`${styles.stockBadge} ${getStockClass(product.stock, product.minStock)}`}>
                                    {product.stock}
                                </span>
                            </span>
                            <span className={styles.colRight}>{product.minStock}</span>
                            <div className={styles.actionCell}>
                                <button
                                    className={styles.menuBtn}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setOpenMenuId(isMenuOpen ? null : product.id)
                                    }}
                                    aria-label="Opciones"
                                >
                                    <MoreVertical size={18} color="#94A3B8" />
                                </button>
                                {isMenuOpen && (
                                    <div className={styles.dropdown}>
                                        <button
                                            className={styles.dropdownItem}
                                            onClick={() => { onEdit(product); setOpenMenuId(null) }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                                            onClick={() => { onDelete(product.id); setOpenMenuId(null) }}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductTable