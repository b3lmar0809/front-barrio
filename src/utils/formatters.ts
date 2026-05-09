/**
 * formatters class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
export const formatCLP = (amount: number): string =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)

export const formatDate = (dateStr: string): string =>
    new Intl.DateTimeFormat('es-CL', { dateStyle: 'long' }).format(new Date(dateStr))
