/**
 * AxiosConfig class
 * @Version: 1.0.0 - 02 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 02 may. 2026
 */
import axios from 'axios'
import { store } from '../app/Store'
import { clearUser } from '../app/Store'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const url: string = error.config?.url ?? ''
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/me')
    if (error.response?.status === 401 && !isAuthEndpoint) {
      store.dispatch(clearUser())
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
