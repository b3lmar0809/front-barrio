/**
 * FormField class
 * @Version: 1.0.0 - 03 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 03 may. 2026
 */
import React from 'react'
import Label from '../../atoms/Label/Label'
import Input from '../../atoms/Input/Input'

interface FormFieldProps {
    label: string
    name: string
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
    required?: boolean
    icon?: React.ReactNode
    onTogglePassword?: () => void
    showPassword?: boolean
    maxLength?: number
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    required = false,
    icon,
    onTogglePassword,
    showPassword,
    maxLength,
}) => {
    return (
        <div>
            <Label text={label} htmlFor={name} required={required} />
            <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                error={error}
                icon={icon}
                onTogglePassword={onTogglePassword}
                showPassword={showPassword}
                maxLength={maxLength}
            />
        </div>
    )
}

export default FormField
