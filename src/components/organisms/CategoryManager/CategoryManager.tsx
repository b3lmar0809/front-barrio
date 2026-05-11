/**
 * CategoryManager class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React from 'react'
import type { Category } from '../../../api/CategoryApi'
import Badge from '../../atoms/Badge/Badge'
import Button from '../../atoms/Button/Button'
import styles from './CategoryManager.module.css'

interface CategoryManagerProps {
    categories: Category[]
    newName: string
    isAdding: boolean
    onNameChange: (name: string) => void
    onAdd: () => void
    onDelete: (id: number) => void
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
    categories,
    newName,
    isAdding,
    onNameChange,
    onAdd,
    onDelete,
}) => (
    <section className={styles.section}>
        <h2 className={styles.title}>Categorías</h2>

        <div className={styles.list}>
            {categories.length === 0 && (
                <span className={styles.empty}>Sin categorías aún</span>
            )}
            {categories.map((cat) => (
                <span key={cat.id} className={styles.chip}>
                    <Badge text={cat.name} variant="info" />
                    <button
                        className={styles.chipRemove}
                        onClick={() => onDelete(cat.id)}
                        aria-label={`Eliminar ${cat.name}`}
                    >
                        ×
                    </button>
                </span>
            ))}
        </div>

        <div className={styles.add}>
            <input
                className={styles.input}
                placeholder="Nueva categoría..."
                value={newName}
                onChange={(e) => onNameChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onAdd()}
            />
            <Button
                label="Agregar"
                onClick={onAdd}
                disabled={!newName.trim() || isAdding}
                isLoading={isAdding}
            />
        </div>
    </section>
)

export default CategoryManager
