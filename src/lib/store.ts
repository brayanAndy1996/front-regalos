import { configureStore } from '@reduxjs/toolkit'
import { regalosSlice } from './regalos'
import { authSlice } from './auth'
import { filtesSlice } from './filters'

export const makeStore = () => {
  return configureStore({
    reducer: { regalos: regalosSlice.reducer, auth: authSlice.reducer, filters: filtesSlice.reducer }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
