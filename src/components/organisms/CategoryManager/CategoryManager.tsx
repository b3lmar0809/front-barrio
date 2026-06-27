/**
 * CategoryManager class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React from 'react'
import { X, Plus } from 'lucide-react'
import type { Category } from '../../../api/CategoryApi'
import { capitalize } from '../../../utils/formatters'
import CategoryChipsSkeleton from '../../molecules/CategoryChipsSkeleton/CategoryChipsSkeleton'
import styles from './CategoryManager.module.css'

interface CategoryManagerProps {
    categories: Category[]
    onOpenModal: () => void
    onDelete: (id: number) => void
    loading?: boolean
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
    categories,
    onOpenModal,
    onDelete,
    loading = false,
}) => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>

                <div className={styles.left}>
                    <span className={styles.listTitle}>
                        {loading
                            ? 'Categorías registradas'
                            : `Categorías registradas (${categories.length})`
                        }
                    </span>
                    <div className={styles.chips}>
                        {loading && <CategoryChipsSkeleton />}
                        {!loading && categories.length === 0 && (
                            <span className={styles.empty}>Sin categorías aún</span>
                        )}
                        {!loading && categories.map((cat, i) => (
                            <span key={cat?.id ?? i} className={styles.chip}>
                                {capitalize(cat?.name ?? 'Sin nombre')}
                                <button
                                    className={styles.chipRemove}
                                    onClick={() => onDelete(cat.id)}
                                    aria-label={`Eliminar ${cat?.name ?? 'categoría'}`}
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <button className={styles.addBtn} onClick={onOpenModal}>
                    <Plus size={15} />
                    Nueva categoría
                </button>

            </div>
        </section>
    )
}

export default CategoryManager
