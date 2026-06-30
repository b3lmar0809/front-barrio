/**
 * Modal atom
 * @Version: 1.0.0 - 29 jun. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 29 jun. 2026
 */
import React, { useEffect } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
    onClose: () => void
    children: React.ReactNode
    maxWidth?: number
}

const Modal: React.FC<ModalProps> = ({ onClose, children, maxWidth = 480 }) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [onClose])

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                style={{ maxWidth }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal
