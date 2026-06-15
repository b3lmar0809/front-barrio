/**
 * FinanceApi class
 * @Version: 1.0.0 - 03 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 03 may. 2026
 */

import api from './axiosConfig'

export interface Finance {
    id: number
    type: string
    amount: number
    description: string
    date: string
}

export interface FinanceRequest {
    userId: number
    type: string
    amount: number
    description: string
}

export interface Balance {
    totalIncome: number
    totalExpenses: number
    balance: number
    period: string
}

export const getFinances = async (userId: number): Promise<Finance[]> => {
    const res = await api.get<Finance[]>(`/finance/${userId}`)
    return res.data
}

export const getBalance = async (userId: number): Promise<Balance> => {
  const res = await api.get<Balance>(`/finance/${userId}/balance`)
  return res.data
}

export const createFinance = async (data : FinanceRequest): Promise<Finance> => {
  const res = await api.post<Finance>('/finance', data)
  return res.data
}