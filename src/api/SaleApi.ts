/**
 * SaleApi class
 * @Version: 1.0.0 - 07 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 07 may. 2026
 */
import api from './axiosConfig'

export interface SaleItem {
    productId: number
    quantity: number
    barcode: string
}

export interface SaleRequest {
    userId: number
    items: SaleItem[]
    paymentMethod: string
    amountReceived: number
}

export interface SaleDetailResponse {
    productId: number
    productName: string
    barcode: string
    quantity: number
    unitPrice: number
    subtotal: number
}

export interface SaleResponse {
    id: number
    userId: number
    total: number
    paymentMethod: string
    change: number
    date: string
    items: SaleDetailResponse[]
}

export const getSales = async (userId: number): Promise<SaleResponse[]> => {
    const res = await api.get<SaleResponse[]>(`/sales/${userId}`)
    return res.data
}

export const getWeeklySales = async (userId: number): Promise<SaleResponse[]> => {
    const res = await api.get<SaleResponse[]>(`/sales/${userId}/weekly`)
    return res.data
}

export const createSale = async (data: SaleRequest): Promise<SaleResponse> => {
    const res = await api.post<SaleResponse>('/sales', data)
    return res.data
}
