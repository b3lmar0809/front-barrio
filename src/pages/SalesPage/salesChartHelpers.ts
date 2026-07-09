/**
 * salesChartHelpers
 *
 * @version 1.0.0 - 29 jun. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 29 jun. 2026
 *
 * Helpers de agregación para gráficos de ventas.
 * Preservados aquí para reutilizar en ReportsPage en una pasada futura.
 **/
import type { SaleResponse } from '../../api/SaleApi'

export const buildChartData = (sales: SaleResponse[]) => {
    const sorted = [...sales].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    const map = new Map<string, { count: number; total: number }>()
    for (const sale of sorted) {
        const d   = new Date(sale.date)
        const key = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
        const prev = map.get(key) ?? { count: 0, total: 0 }
        map.set(key, { count: prev.count + 1, total: prev.total + sale.total })
    }
    return Array.from(map.entries()).map(([date, { count, total }]) => ({ date, count, total }))
}

export const buildTopProducts = (sales: SaleResponse[]) => {
    const map = new Map<string, number>()
    for (const sale of sales) {
        for (const item of sale.items) {
            map.set(item.productName, (map.get(item.productName) ?? 0) + item.quantity)
        }
    }
    return Array.from(map.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, qty]) => ({ name, qty }))
}
