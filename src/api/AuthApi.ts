/**
 * AuthApi class
 * @Version: 1.0.0 - 02 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 02 may. 2026
 */
import axiosInstance from './axiosConfig'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  companyName: string
  rut: string
}

export interface AuthResponse {
  id: number
  name: string
  email: string
  companyName: string
  planType: string
  planLimit: number | null
}

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', data)
  return response.data
}

export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/register', data)
  return response.data
}

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout')
}

export const getMe = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.get<AuthResponse>('/auth/me')
  return response.data
}
