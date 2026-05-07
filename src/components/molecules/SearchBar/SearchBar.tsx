/**
 * SearchBar class
 * @Version: 1.0.0 - 06 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 06 may. 2026
 */
import React from 'react'
import Input from '../../atoms/Input/Input'
import Button from '../../atoms/Button/Button'
import styles from './SearchBar.module.css'

interface SearchBarProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSearch: () => void
    placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    onSearch,
    placeholder = 'Buscar...',
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSearch()
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
            <Button label="Buscar" onClick={onSearch} />
        </div>
    )
}

export default SearchBar