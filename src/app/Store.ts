/**
 * Store class
 * @Version: 1.0.0 - 02 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 02 may. 2026
 */
import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  id: number | null
  name: string
  email: string
  companyName: string
  planType: string
  planLimit: number | null
  isAuthenticated: boolean
}

const initialState: UserState = {
  id: null,
  name: '',
  email: '',
  companyName: '',
  planType: '',
  planLimit: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.companyName = action.payload.companyName
      state.planType = action.payload.planType
      state.planLimit = action.payload.planLimit
      state.isAuthenticated = true
    },
    clearUser(state) {
      state.id = null
      state.name = ''
      state.email = ''
      state.companyName = ''
      state.planType = ''
      state.planLimit = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
