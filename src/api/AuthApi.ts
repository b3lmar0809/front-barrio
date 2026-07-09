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
  lastName: string
  email: string
  password: string
  companyName: string
  rut: string
  declaresIva?: boolean
}

export interface AuthResponse {
  id: number
  name: string
  email: string
  companyName: string
  rut: string
  planType: string
  planLimit: number | null
  declaresIva: boolean
}

export interface UpdateProfileRequest {
  companyName?: string
  rut?: string
  declaresIva?: boolean
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

export const updateProfile = async (data: UpdateProfileRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.patch<AuthResponse>('/auth/profile', data)
  return response.data
}
