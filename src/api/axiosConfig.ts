/**
 * AxiosConfig class
 * @Version: 1.0.0 - 02 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 02 may. 2026
 */
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default axiosInstance
