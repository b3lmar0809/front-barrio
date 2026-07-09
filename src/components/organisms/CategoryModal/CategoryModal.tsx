/**
 * CategoryModal
 * @Version: 1.0.0 - 21 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 21 jun. 2026
 */
import React, { useState } from 'react'
import { X } from 'lucide-react'
import styles from './CategoryModal.module.css'

interface CategoryModalProps {
    onClose: () => void
    onAdd: (name: string) => Promise<void>
    isAdding: boolean
}

const CategoryModal: React.FC<CategoryModalProps> = ({ onClose, onAdd, isAdding }) => {
    const [name, setName] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleClose = () => {
        setName('')
        setError(null)
        onClose()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = name.trim()
        if (!trimmed) {
            setError('El nombre es obligatorio')
            return
        }
        setError(null)
        await onAdd(trimmed)
    }

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                <div className={styles.header}>
                    <h3 className={styles.title}>Nueva categoría</h3>
                    <button className={styles.close} onClick={handleClose} aria-label="Cerrar">
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.field}>
                        <label className={styles.label}>Nombre de la categoría</label>
                        <input
                            className={`${styles.input}${error ? ` ${styles.inputError}` : ''}`}
                            value={name}
                            onChange={(e) => { setName(e.target.value); setError(null) }}
                            placeholder="Ej: Bebidas"
                            autoFocus
                        />
                        {error && <p className={styles.errorText}>{error}</p>}
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={handleClose}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.addBtn} disabled={isAdding}>
                            {isAdding ? <span className={styles.spinner} /> : 'Agregar'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CategoryModal
