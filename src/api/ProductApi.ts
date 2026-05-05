/**
 * ProductApi class
 * @Version: 1.0.0 - 03 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 03 may. 2026
 */
import api from './axiosConfig'

export interface Product {
    id: number
    name:string
    category: string
    barCode: string
    boxPrice: number
    unitCost: number
    salePrice: number
    profit: number
    iva: number
    stock: number
    minStock: number
}

export interface ProductRequest {
    name: string
    categoryId: number
    barCode: string
    boxPrice: number
    unitsPerBox: number
    salePrice: number
    stock: number
    minStock: number
    userId: number
    active: boolean
}

export interface SearchResponse {
    products: Product[]
    total: number
    searchType: string
}

export const getProducts = async (userId: number): Promise<Product[]> => {
    const res = await api.get<Product[]>(`/products/${userId}`)
    return res.data
}

export const searchByText = async (userId: number, q : string): Promise<SearchResponse> => {
    const res = await api.get<SearchResponse>(`products/search?userId=${userId}&q=${q}`)
    return res.data
}

export const searchByCode = async(barCode : string): Promise<SearchResponse> => {
    const res = await api.get<SearchResponse>(`products/serch?code=${barCode}`)
    return res.data
}

export const createProduct = async (data: ProductRequest): Promise<Product> => {
  const res = await api.post<Product>('/products', data)
  return res.data
}

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`products/${id}`)

}