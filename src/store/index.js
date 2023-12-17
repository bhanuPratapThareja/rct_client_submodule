import { configureStore } from '@reduxjs/toolkit'

import { carsFormReducer, carsListReducer } from './slices/carsSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        carsForm: carsFormReducer,
        carsList: carsListReducer,
        user: userReducer
    }
})