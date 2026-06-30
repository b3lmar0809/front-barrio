/**
 * formatters class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
export const formatCLP = (amount: number): string => {
    if (amount == null || !Number.isFinite(amount)) return '—'
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Math.round(amount))
}

// Formato de separador de miles para inputs (sin símbolo $): 1500 → "1.500"
export const formatInputCLP = (raw: string | number): string => {
    const digits = String(raw).replace(/\D/g, '')
    if (!digits) return ''
    return new Intl.NumberFormat('es-CL').format(Number(digits))
}

// Quita el formato de miles y devuelve solo dígitos: "1.500" → "1500"
export const parseCLP = (formatted: string): string =>
    formatted.replace(/\D/g, '')

export const formatDate = (dateStr: string): string =>
    new Intl.DateTimeFormat('es-CL', { dateStyle: 'long' }).format(new Date(dateStr))

const MONTHS_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export const formatDateShort = (dateStr: string): string => {
    const d = new Date(dateStr)
    return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`
}

export const formatTime = (dateStr: string): string => {
    const d = new Date(dateStr)
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export const capitalize = (str: string): string =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export const formatMonthYear = (period: string): string => {
    if (!period) return ''
    const [year, month] = period.split('-')
    if (!year || !month) return period
    const date = new Date(Number(year), Number(month) - 1, 1)
    const monthName = date.toLocaleDateString('es-CL', { month: 'long' })
    return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ${year}`
}
