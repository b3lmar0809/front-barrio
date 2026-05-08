/**
 * CategoryApi class
 * @Version: 1.0.0 - 03 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 03 may. 2026
 */
import api from './axiosConfig'

export interface Category {
    id: number
    name: string
    userId: number
}

export interface CategoryRequest {
    userId: number
    name: string
}

export const getCategory = async(userId : number): Promise<Category[]> => {
    const res = await api.get<Category[]>(`/categories/${userId}`)
    return res.data
}

export const createCategory = async (data: CategoryRequest): Promise<Category> => {
    const res = await api.post<Category>('/categories', data)
    return res.data
}

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`)
}