/**
 * SearchBar class
 * @Version: 1.0.0 - 06 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 06 may. 2026
 */
import React from 'react'
import { Camera } from 'lucide-react'
import Input from '../../atoms/Input/Input'
import styles from './SearchBar.module.css'

interface SearchBarProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSearch: () => void
    onScannerEnter?: () => void
    onCameraToggle?: () => void
    cameraOpen?: boolean
    placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    onSearch,
    onScannerEnter,
    onCameraToggle,
    cameraOpen = false,
    placeholder = 'Buscar...',
}) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') onScannerEnter?.()
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputWrapper} onKeyDown={handleKeyDown}>
                <Input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
            <button className={styles.searchBtn} onClick={onSearch} type="button">
                Buscar
            </button>
            {onCameraToggle && (
                <button
                    className={`${styles.cameraBtn} ${cameraOpen ? styles.cameraBtnActive : ''}`}
                    onClick={onCameraToggle}
                    type="button"
                    aria-label="Escanear con cámara"
                    aria-pressed={cameraOpen}
                >
                    <Camera size={20} />
                </button>
            )}
        </div>
    )
}

export default SearchBar