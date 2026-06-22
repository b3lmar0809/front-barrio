/**
 * formatters class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
export const formatCLP = (amount: number): string =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Math.round(amount))

export const formatDate = (dateStr: string): string =>
    new Intl.DateTimeFormat('es-CL', { dateStyle: 'long' }).format(new Date(dateStr))

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
