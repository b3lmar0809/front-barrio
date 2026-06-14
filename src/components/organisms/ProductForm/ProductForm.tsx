/**
 * ProductForm class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React, { useState } from 'react'
import type { Category } from '../../../api/CategoryApi'
import { formatCLP } from '../../../utils/formatters'
import Button from '../../atoms/Button/Button'
import styles from './ProductForm.module.css'

export interface ProductFormValues {
    name: string
    categoryId: number | ''
    barcode: string
    boxPrice: string
    unitsPerBox: string
    salePrice: string
    stock: string
    minStock: string
    paysIva: boolean
}

interface ProductFormProps {
    categories: Category[]
    isLoading: boolean
    error: string | null
    onSubmit: (values: ProductFormValues) => void
    onClose: () => void
}

const EMPTY: ProductFormValues = {
    name: '', categoryId: '', barcode: '',
    boxPrice: '', unitsPerBox: '', salePrice: '',
    stock: '', minStock: '', paysIva: false,
}

const ProductForm: React.FC<ProductFormProps> = ({ categories, isLoading, error, onSubmit, onClose }) => {
    const [values, setValues] = useState<ProductFormValues>(EMPTY)
    const [errors, setErrors] = useState<{
        name?: string; categoryId?: string; salePrice?: string
        stock?: string; minStock?: string; barcode?: string
        boxPrice?: string; unitsPerBox?: string
    }>({})

    const set = <K extends keyof ProductFormValues>(key: K, val: ProductFormValues[K]) =>
        setValues((prev) => ({ ...prev, [key]: val }))

    const bpNum  = parseFloat(values.boxPrice    || '0')
    const upbNum = parseFloat(values.unitsPerBox || '0')
    const spNum  = parseFloat(values.salePrice   || '0')
    const unitCost   = upbNum > 0 ? bpNum / upbNum : 0
    const neto       = values.paysIva ? spNum / 1.19 : spNum
    const iva        = values.paysIva ? spNum - neto : 0
    const profit     = neto - unitCost
    const showPreview = bpNum > 0 || spNum > 0

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: typeof errors = {}

        if (!values.name.trim()) {
            newErrors.name = 'El nombre es obligatorio'
        } else if (values.name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres'
        }

        if (!values.categoryId) {
            newErrors.categoryId = 'Debes seleccionar una categoría'
        }

        if (!values.salePrice) {
            newErrors.salePrice = 'El precio de venta es obligatorio'
        } else if (isNaN(parseFloat(values.salePrice)) || parseFloat(values.salePrice) <= 0) {
            newErrors.salePrice = 'El precio de venta debe ser mayor a 0'
        }

        if (values.stock === '') {
            newErrors.stock = 'El stock inicial es obligatorio'
        } else if (parseInt(values.stock, 10) < 0 || isNaN(parseInt(values.stock, 10))) {
            newErrors.stock = 'El stock debe ser mayor o igual a 0'
        }

        if (values.minStock === '') {
            newErrors.minStock = 'El stock mínimo es obligatorio'
        } else if (parseInt(values.minStock, 10) < 0 || isNaN(parseInt(values.minStock, 10))) {
            newErrors.minStock = 'El stock mínimo debe ser mayor o igual a 0'
        }

        if (values.barcode.trim() && !/^[a-zA-Z0-9]+$/.test(values.barcode.trim())) {
            newErrors.barcode = 'Solo se permiten letras y números, sin espacios'
        }

        if (values.boxPrice && (isNaN(parseFloat(values.boxPrice)) || parseFloat(values.boxPrice) <= 0)) {
            newErrors.boxPrice = 'El precio por caja debe ser un número positivo'
        }

        if (values.unitsPerBox) {
            const upb = parseFloat(values.unitsPerBox)
            if (isNaN(upb) || upb <= 0 || !Number.isInteger(upb)) {
                newErrors.unitsPerBox = 'Las unidades deben ser un entero positivo'
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        onSubmit(values)
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Agregar producto</h3>
                    <button className={styles.modalClose} onClick={onClose} aria-label="Cerrar">×</button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>

                    <div className={styles.field}>
                        <label className={styles.label}>Nombre *</label>
                        <input
                            className={styles.input}
                            required
                            value={values.name}
                            onChange={(e) => set('name', e.target.value)}
                            placeholder="Nombre del producto"
                        />
                        {errors.name && <p className={styles.formError}>{errors.name}</p>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Categoría *</label>
                        <select
                            className={styles.select}
                            required
                            value={values.categoryId}
                            onChange={(e) => set('categoryId', Number(e.target.value))}
                        >
                            <option value="">Seleccionar categoría</option>
                            {categories.map((c, i) => (
                                <option key={c?.id ?? i} value={c?.id ?? ''}>{c?.name ?? 'Sin categoría'}</option>
                            ))}
                        </select>
                        {errors.categoryId && <p className={styles.formError}>{errors.categoryId}</p>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Código de barras</label>
                        <input
                            className={styles.input}
                            value={values.barcode}
                            onChange={(e) => set('barcode', e.target.value)}
                            placeholder="Opcional"
                        />
                        {errors.barcode && <p className={styles.formError}>{errors.barcode}</p>}
                    </div>

                    <div className={styles.row2}>
                        <div className={styles.field}>
                            <label className={styles.label}>Precio por caja *</label>
                            <input
                                className={styles.input}
                                type="number"
                                min={1}
                                required
                                value={values.boxPrice}
                                onChange={(e) => set('boxPrice', e.target.value)}
                                placeholder="$0"
                            />
                            {errors.boxPrice && <p className={styles.formError}>{errors.boxPrice}</p>}
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Unidades por caja *</label>
                            <input
                                className={styles.input}
                                type="number"
                                min={1}
                                required
                                value={values.unitsPerBox}
                                onChange={(e) => set('unitsPerBox', e.target.value)}
                                placeholder="0"
                            />
                            {errors.unitsPerBox && <p className={styles.formError}>{errors.unitsPerBox}</p>}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Precio de venta *</label>
                        <input
                            className={styles.input}
                            type="number"
                            min={1}
                            required
                            value={values.salePrice}
                            onChange={(e) => set('salePrice', e.target.value)}
                            placeholder="$0"
                        />
                        {errors.salePrice && <p className={styles.formError}>{errors.salePrice}</p>}
                    </div>

                    <div className={styles.row2}>
                        <div className={styles.field}>
                            <label className={styles.label}>Stock inicial *</label>
                            <input
                                className={styles.input}
                                type="number"
                                min={0}
                                required
                                value={values.stock}
                                onChange={(e) => set('stock', e.target.value)}
                                placeholder="0"
                            />
                            {errors.stock && <p className={styles.formError}>{errors.stock}</p>}
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Stock mínimo *</label>
                            <input
                                className={styles.input}
                                type="number"
                                min={0}
                                required
                                value={values.minStock}
                                onChange={(e) => set('minStock', e.target.value)}
                                placeholder="0"
                            />
                            {errors.minStock && <p className={styles.formError}>{errors.minStock}</p>}
                        </div>
                    </div>

                    <label className={styles.toggleRow}>
                        <input
                            type="checkbox"
                            checked={values.paysIva}
                            onChange={(e) => set('paysIva', e.target.checked)}
                        />
                        <span className={styles.toggleLabel}>¿El negocio declara IVA?</span>
                    </label>

                    {showPreview && (
                        <div className={styles.preview}>
                            <div className={styles.previewRow}>
                                <span>Costo unitario</span>
                                <span>{formatCLP(unitCost)}</span>
                            </div>
                            {values.paysIva && (
                                <div className={styles.previewRow}>
                                    <span>IVA incluido</span>
                                    <span>{formatCLP(iva)}</span>
                                </div>
                            )}
                            <div className={styles.previewRow}>
                                <span>Ganancia</span>
                                <span className={profit > 0 ? styles.previewPositive : styles.previewNegative}>
                                    {formatCLP(profit)}
                                </span>
                            </div>
                        </div>
                    )}

                    {error && <p className={styles.formError}>{error}</p>}

                    <div className={styles.actions}>
                        <Button label="Cancelar" variant="secondary" type="button" onClick={onClose} />
                        <Button label="Guardar producto" type="submit" isLoading={isLoading} disabled={isLoading} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductForm
