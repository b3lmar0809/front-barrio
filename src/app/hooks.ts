/**
 * Hooks class
 * @Version: 1.0.0 - 02 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 02 may. 2026
 */
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './Store.ts'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector = <T>(selector: (state: RootState) => T): T => useSelector(selector)
