/**
 * ProductForm class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React, { useState } from 'react'
import { X } from 'lucide-react'
import type { Category } from '../../../api/CategoryApi'
import { formatCLP, formatInputCLP, parseCLP } from '../../../utils/formatters'
import styles from './ProductForm.module.css'

export interface ProductFormValues {
    name: string
    categoryId: number | ''
    barcode: string
    boxPrice: string
    unitsPerBox: string
    salePrice: string
    boxCount: string
    stock: string
    minStock: string
    paysIva: boolean
}

type FieldErrors = Partial<Record<
    'name' | 'categoryId' | 'barcode' | 'boxPrice' | 'unitsPerBox' | 'salePrice' | 'boxCount' | 'minStock',
    string
>>

interface ProductFormProps {
    categories: Category[]
    isLoading: boolean
    error: string | null
    onSubmit: (values: ProductFormValues) => void
    onClose: () => void
    initialValues?: Partial<ProductFormValues>
    mode?: 'create' | 'edit'
}

const EMPTY: ProductFormValues = {
    name: '', categoryId: '', barcode: '',
    boxPrice: '', unitsPerBox: '', salePrice: '',
    boxCount: '', stock: '0', minStock: '', paysIva: false,
}

function calcStock(boxCount: string, unitsPerBox: string): string {
    const b = parseInt(boxCount, 10)
    const u = parseInt(unitsPerBox, 10)
    if (!boxCount || !unitsPerBox || isNaN(b) || isNaN(u) || b <= 0 || u <= 0) return '0'
    return String(b * u)
}

const ProductForm: React.FC<ProductFormProps> = ({
    categories, isLoading, error, onSubmit, onClose,
    initialValues, mode = 'create',
}) => {
    const [values, setValues] = useState<ProductFormValues>({ ...EMPTY, ...initialValues })
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

    const set = <K extends keyof ProductFormValues>(key: K, val: ProductFormValues[K]) =>
        setValues((prev) => ({ ...prev, [key]: val }))

    const clearErr = (key: keyof FieldErrors) =>
        setFieldErrors((prev) => { const n = { ...prev }; delete n[key]; return n })

    const onBoxCountChange = (val: string) => {
        setValues((prev) => ({ ...prev, boxCount: val, stock: calcStock(val, prev.unitsPerBox) }))
        clearErr('boxCount')
    }

    const onUnitsPerBoxChange = (val: string) => {
        setValues((prev) => ({ ...prev, unitsPerBox: val, stock: calcStock(prev.boxCount, val) }))
        clearErr('unitsPerBox')
    }

    const bpNum      = parseFloat(values.boxPrice    || '0')
    const upbNum     = parseFloat(values.unitsPerBox || '0')
    const spNum      = parseFloat(values.salePrice   || '0')
    const unitCost   = upbNum > 0 ? bpNum / upbNum : 0
    const neto       = values.paysIva ? spNum / 1.19 : spNum
    const iva        = values.paysIva ? spNum - neto : 0
    const profit     = neto - unitCost
    const showPreview = bpNum > 0 || spNum > 0
    const profitWarn  = spNum > 0 && unitCost > 0 && spNum < unitCost

    const validate = (): FieldErrors => {
        const errs: FieldErrors = {}

        const nameVal = values.name.trim()
        if (!nameVal) errs.name = 'El nombre es obligatorio'
        else if (nameVal.length < 2) errs.name = 'Mínimo 2 caracteres'

        if (!values.categoryId) errs.categoryId = 'Selecciona una categoría'

        if (!values.boxPrice) {
            errs.boxPrice = 'El precio por caja es obligatorio'
        } else if (isNaN(parseFloat(values.boxPrice)) || parseFloat(values.boxPrice) <= 0) {
            errs.boxPrice = 'Ingresa un número mayor a 0'
        }

        if (!values.unitsPerBox) {
            errs.unitsPerBox = 'Las unidades por caja son obligatorias'
        } else {
            const u = parseFloat(values.unitsPerBox)
            if (isNaN(u) || u <= 0 || !Number.isInteger(u)) errs.unitsPerBox = 'Debe ser un entero mayor a 0'
        }

        if (!values.salePrice) {
            errs.salePrice = 'El precio de venta es obligatorio'
        } else if (isNaN(parseFloat(values.salePrice)) || parseFloat(values.salePrice) <= 0) {
            errs.salePrice = 'Ingresa un número mayor a 0'
        }

        if (!values.boxCount) {
            errs.boxCount = 'La cantidad de cajas es obligatoria'
        } else {
            const b = parseFloat(values.boxCount)
            if (isNaN(b) || b <= 0 || !Number.isInteger(b)) errs.boxCount = 'Debe ser un entero mayor a 0'
        }

        if (values.minStock === '') {
            errs.minStock = 'El stock mínimo es obligatorio'
        } else if (isNaN(parseInt(values.minStock, 10)) || parseInt(values.minStock, 10) < 0) {
            errs.minStock = 'Debe ser mayor o igual a 0'
        }

        if (values.barcode.trim() && !/^[a-zA-Z0-9]+$/.test(values.barcode.trim())) {
            errs.barcode = 'Solo letras y números, sin espacios'
        }

        return errs
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) { setFieldErrors(errs); return }
        setFieldErrors({})
        onSubmit(values)
    }

    const cls = (err?: string) => `${styles.input}${err ? ` ${styles.inputError}` : ''}`

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                <div className={styles.header}>
                    <h3 className={styles.title}>
                        {mode === 'edit' ? 'Editar producto' : 'Agregar producto'}
                    </h3>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                        <X size={18} />
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>

                    {/* ── Nombre ── */}
                    <div className={styles.field}>
                        <label className={styles.label}>
                            Nombre <span className={styles.req}>*</span>
                        </label>
                        <input
                            className={cls(fieldErrors.name)}
                            value={values.name}
                            onChange={(e) => { set('name', e.target.value); clearErr('name') }}
                            placeholder="Nombre del producto"
                        />
                        {fieldErrors.name && <p className={styles.fieldError}>{fieldErrors.name}</p>}
                    </div>

                    {/* ── Categoría ── */}
                    <div className={styles.field}>
                        <label className={styles.label}>
                            Categoría <span className={styles.req}>*</span>
                        </label>
                        <select
                            className={cls(fieldErrors.categoryId)}
                            value={values.categoryId}
                            onChange={(e) => {
                                const v = e.target.value
                                set('categoryId', v === '' ? '' : Number(v))
                                clearErr('categoryId')
                            }}
                        >
                            <option value="">Seleccionar categoría</option>
                            {categories.map((c, i) => (
                                <option key={c?.id ?? i} value={c?.id ?? ''}>{c?.name ?? 'Sin categoría'}</option>
                            ))}
                        </select>
                        {fieldErrors.categoryId && <p className={styles.fieldError}>{fieldErrors.categoryId}</p>}
                    </div>

                    {/* ── Código de barras ── */}
                    <div className={styles.field}>
                        <label className={styles.label}>Código de barras</label>
                        <input
                            className={cls(fieldErrors.barcode)}
                            value={values.barcode}
                            onChange={(e) => { set('barcode', e.target.value); clearErr('barcode') }}
                            placeholder="Opcional"
                        />
                        {fieldErrors.barcode && <p className={styles.fieldError}>{fieldErrors.barcode}</p>}
                    </div>

                    {/* ── Precio x caja | Unidades x caja ── */}
                    <div className={styles.row2}>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                Precio por caja <span className={styles.req}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.currencyPrefix}>$</span>
                                <input
                                    className={`${cls(fieldErrors.boxPrice)} ${styles.inputWithPrefix}`}
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="off"
                                    value={formatInputCLP(values.boxPrice)}
                                    onChange={(e) => { set('boxPrice', parseCLP(e.target.value)); clearErr('boxPrice') }}
                                    placeholder="0"
                                />
                            </div>
                            {fieldErrors.boxPrice && <p className={styles.fieldError}>{fieldErrors.boxPrice}</p>}
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                Unidades por caja <span className={styles.req}>*</span>
                            </label>
                            <input
                                className={cls(fieldErrors.unitsPerBox)}
                                type="number"
                                min={1}
                                value={values.unitsPerBox}
                                onChange={(e) => onUnitsPerBoxChange(e.target.value)}
                                placeholder="0"
                            />
                            {fieldErrors.unitsPerBox && <p className={styles.fieldError}>{fieldErrors.unitsPerBox}</p>}
                        </div>
                    </div>

                    {/* ── Precio de venta ── */}
                    <div className={styles.field}>
                        <label className={styles.label}>
                            Precio de venta <span className={styles.req}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.currencyPrefix}>$</span>
                            <input
                                className={`${cls(fieldErrors.salePrice)} ${styles.inputWithPrefix}`}
                                type="text"
                                inputMode="numeric"
                                autoComplete="off"
                                value={formatInputCLP(values.salePrice)}
                                onChange={(e) => { set('salePrice', parseCLP(e.target.value)); clearErr('salePrice') }}
                                placeholder="0"
                            />
                        </div>
                        {fieldErrors.salePrice && <p className={styles.fieldError}>{fieldErrors.salePrice}</p>}
                        {!fieldErrors.salePrice && profitWarn && (
                            <p className={styles.warnText}>⚠ El precio es menor al costo unitario</p>
                        )}
                    </div>

                    {/* ── Cantidad de cajas | Stock inicial (readonly) ── */}
                    <div className={styles.row2}>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                Cantidad de cajas <span className={styles.req}>*</span>
                            </label>
                            <input
                                className={cls(fieldErrors.boxCount)}
                                type="number"
                                min={1}
                                value={values.boxCount}
                                onChange={(e) => onBoxCountChange(e.target.value)}
                                placeholder="0"
                            />
                            {fieldErrors.boxCount && <p className={styles.fieldError}>{fieldErrors.boxCount}</p>}
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Stock inicial</label>
                            <input
                                className={styles.inputReadonly}
                                type="number"
                                value={values.stock}
                                readOnly
                                tabIndex={-1}
                            />
                            <p className={styles.hint}>Cajas × unidades por caja</p>
                        </div>
                    </div>

                    {/* ── Stock mínimo ── */}
                    <div className={styles.field}>
                        <label className={styles.label}>
                            Stock mínimo <span className={styles.req}>*</span>
                        </label>
                        <input
                            className={cls(fieldErrors.minStock)}
                            type="number"
                            min={0}
                            value={values.minStock}
                            onChange={(e) => { set('minStock', e.target.value); clearErr('minStock') }}
                            placeholder="0"
                        />
                        {fieldErrors.minStock && <p className={styles.fieldError}>{fieldErrors.minStock}</p>}
                    </div>

                    {/* ── IVA ── */}
                    <label className={styles.toggleRow}>
                        <input
                            type="checkbox"
                            checked={values.paysIva}
                            onChange={(e) => set('paysIva', e.target.checked)}
                        />
                        <span className={styles.toggleLabel}>¿El negocio declara IVA?</span>
                    </label>

                    {/* ── Preview de márgenes ── */}
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
                                <span>Ganancia por unidad</span>
                                <span className={profit > 0 ? styles.previewPositive : styles.previewNegative}>
                                    {formatCLP(profit)}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* ── Error de servidor ── */}
                    {error && <p className={styles.serverError}>{error}</p>}

                    {/* ── Acciones ── */}
                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                            {isLoading
                                ? <span className={styles.spinner} />
                                : (mode === 'edit' ? 'Guardar cambios' : 'Guardar producto')
                            }
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ProductForm
