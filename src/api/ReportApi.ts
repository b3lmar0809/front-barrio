/**
 * ReportApi class
 * @Version: 1.0.0 - 03 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 03 may. 2026
 */

import api from './axiosConfig'

export interface ProductStats {
    productId: number
    productName: string
    totalSold: number
    totalRevenue: number
    rankingVentas: number
    period: string
}

export interface Dashboard {
    totalSoldMonth: number
    totalIvaMonth: number
    totalProfitMonth: number
    topProducts: ProductStats[]
    lowStockCount: number
    currentPeriod: string
}

export interface SaleReport {
    totalSold: number
    totalIva: number
    totalProfit: number
    period: string
}

export const getDashboard = async (userId: number): Promise<Dashboard> => {
    const res = await api.get<Dashboard>(`/reports/${userId}`)
    return res.data
}

export const getSaleReport = async (userId: number, period: string): Promise<SaleReport> => {
  const res = await api.get<SaleReport>(`/reports/${userId}?period=${period}`)
  return res.data  
}

export const getSlowStock = async (userId: number): Promise<any[]> => {
  const res = await api.get<any[]>(`/report/${userId}/low-stock`)
    return res.data
}