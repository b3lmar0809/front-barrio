/**
 * CategoryManager class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React, { useState } from 'react'
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
}) => {
    const [catError, setCatError] = useState<string | null>(null)

    const handleAdd = () => {
        const trimmed = newName.trim()
        if (!trimmed) {
            setCatError('El nombre es obligatorio')
            return
        }
        if (trimmed.length < 2) {
            setCatError('El nombre debe tener al menos 2 caracteres')
            return
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(trimmed)) {
            setCatError('Solo se permiten letras y espacios')
            return
        }
        setCatError(null)
        onAdd()
    }

    return (
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
                    onChange={(e) => { onNameChange(e.target.value); setCatError(null) }}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <Button
                    label="Agregar"
                    onClick={handleAdd}
                    disabled={isAdding}
                    isLoading={isAdding}
                />
            </div>
            {catError && <p style={{ color: '#dc2626', fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>{catError}</p>}
        </section>
    )
}

export default CategoryManager
