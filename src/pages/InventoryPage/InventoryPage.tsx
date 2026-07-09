/**
 * InventoryPage
 *
 * @version 1.1.0 - 10 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 09 may. 2026
 *
 **/
import React, { useEffect, useState } from 'react'
import { getProducts, createProduct, deleteProduct } from '../../api/ProductApi'
import type { Product as ApiProduct } from '../../api/ProductApi'
import { getCategory, createCategory, deleteCategory } from '../../api/CategoryApi'
import type { Category } from '../../api/CategoryApi'
import { useAppSelector } from '../../app/hooks'
import ProductTable from '../../components/organisms/ProductTable/ProductTable'
import type { Product as TableProduct } from '../../components/organisms/ProductTable/ProductTable'
import CategoryManager from '../../components/organisms/CategoryManager/CategoryManager'
import CategoryModal from '../../components/organisms/CategoryModal/CategoryModal'
import ProductForm from '../../components/organisms/ProductForm/ProductForm'
import type { ProductFormValues } from '../../components/organisms/ProductForm/ProductForm'
import SearchBar from '../../components/molecules/SearchBar/SearchBar'
import Badge from '../../components/atoms/Badge/Badge'
import Button from '../../components/atoms/Button/Button'
import Skeleton from '../../components/atoms/Skeleton/Skeleton'
import styles from './InventoryPage.module.css'

const InventoryPage: React.FC = () => {
    const userId    = useAppSelector((s) => s.user.id)
    const planType  = useAppSelector((s) => s.user.planType)
    const planLimit = useAppSelector((s) => s.user.planLimit)

    const [products,   setProducts]   = useState<ApiProduct[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading,    setLoading]    = useState(true)
    const [error,      setError]      = useState<string | null>(null)

    const [query, setQuery] = useState('')

    const [addingCat,           setAddingCat]           = useState(false)
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

    const [showForm,  setShowForm]  = useState(false)
    const [saving,    setSaving]    = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    useEffect(() => {
        if (!userId) return
        const load = async () => {
            try {
                setLoading(true)
                const [prods, cats] = await Promise.all([
                    getProducts(userId),
                    getCategory(userId),
                ])
                setProducts(prods)
                setCategories(cats)
            } catch {
                setError('No se pudieron cargar los productos.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [userId])

    const filtered: TableProduct[] = products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .map(({ id, name, category, barcode, salePrice, unitCost, stock, minStock }) => ({
            id, name, barcode, salePrice, unitCost, stock, minStock,
            category: category?.name ?? 'Sin categoría',
        }))

    const handleAddCategory = async (name: string) => {
        if (!userId || !name.trim()) return
        setAddingCat(true)
        try {
            const cat = await createCategory({ userId, name: name.trim() })
            setCategories((prev) => [...prev, cat])
            setIsCategoryModalOpen(false)
        } finally {
            setAddingCat(false)
        }
    }

    const handleDeleteCategory = async (id: number) => {
        try {
            await deleteCategory(id)
            setCategories((prev) => prev.filter((c) => c.id !== id))
        } catch { /* silent */ }
    }

    const handleDeleteProduct = async (id: number) => {
        try {
            await deleteProduct(id)
            setProducts((prev) => prev.filter((p) => p.id !== id))
        } catch {
            setError('No se pudo eliminar el producto.')
        }
    }

    const closeForm = () => setShowForm(false)

    const handleCreateProduct = async (values: ProductFormValues) => {
        if (!userId) return
        setSaving(true)
        setFormError(null)
        try {
            const created = await createProduct({
                userId,
                name:        values.name.trim(),
                categoryId:  values.categoryId as number,
                barcode:     values.barcode.trim(),
                boxPrice:    parseFloat(values.boxPrice),
                unitsPerBox: parseFloat(values.unitsPerBox),
                salePrice:   parseFloat(values.salePrice),
                stock:       parseInt(values.stock,    10),
                minStock:    parseInt(values.minStock, 10),
                active:      true,
            })
            setProducts((prev) => [...prev, created])
            setShowForm(false)
        } catch (err: unknown) {
            const axiosErr = err as { response?: { data?: { message?: string } } }
            const msg = axiosErr?.response?.data?.message
            setFormError(msg ?? 'No se pudo crear el producto. Verifica los datos.')
        } finally {
            setSaving(false)
        }
    }

    const isFree  = planType === 'FREE'
    const atLimit = isFree && planLimit !== null && products.length >= planLimit

    return (
        <div className={styles.page}>

            {/* ── Categorías ─────────────────────────────────── */}
            <CategoryManager
                categories={categories}
                onOpenModal={() => setIsCategoryModalOpen(true)}
                onDelete={handleDeleteCategory}
                loading={loading}
            />

            {/* ── Productos ──────────────────────────────────── */}
            <section className={styles.section}>
                <div className={styles.productsHeader}>
                    <div className={styles.titleRow}>
                        <h2 className={styles.sectionTitle}>Productos</h2>
                        {loading
                            ? <Skeleton width={80} height={20} />
                            : <>
                                <Badge text={String(products.length)} variant="neutral" />
                                {isFree && planLimit !== null && (
                                    <span className={styles.planLimit}>
                                        {products.length}/{planLimit} productos
                                    </span>
                                )}
                            </>
                        }
                    </div>
                    <Button
                        label="+ Agregar producto"
                        onClick={() => setShowForm(true)}
                        disabled={atLimit}
                    />
                </div>

                <SearchBar
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onSearch={() => {}}
                    placeholder="Buscar por nombre..."
                />

                {error && <p className={styles.error}>{error}</p>}

                {!loading && !error && products.length === 0 && (
                    <p className={styles.empty}>No tienes productos aún</p>
                )}

                {!loading && !error && products.length > 0 && filtered.length === 0 && (
                    <p className={styles.empty}>No se encontraron productos</p>
                )}

                {!error && (loading || filtered.length > 0) && (
                    <ProductTable
                        products={filtered}
                        onDelete={handleDeleteProduct}
                        onEdit={() => {}}
                        loading={loading}
                    />
                )}
            </section>

            {/* ── Modal: nueva categoría ────────────────────── */}
            {isCategoryModalOpen && (
                <CategoryModal
                    onClose={() => setIsCategoryModalOpen(false)}
                    onAdd={handleAddCategory}
                    isAdding={addingCat}
                />
            )}

            {/* ── Modal: agregar producto ────────────────────── */}
            {showForm && (
                <ProductForm
                    categories={categories}
                    isLoading={saving}
                    error={formError}
                    onSubmit={handleCreateProduct}
                    onClose={closeForm}
                />
            )}
        </div>
    )
}

export default InventoryPage
