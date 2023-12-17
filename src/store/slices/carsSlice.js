import { createSlice } from "@reduxjs/toolkit";
import { addCarAsync, fetchCars, deleteCar } from "../thunks/carsThunk";

const carsFormSlice = createSlice({
    name: 'carsForm',
    initialState: {
        name: '',
        cost: 0,
        loading: false,
        error: ''
    },
    reducers: {
        changeInput(state, action) {
            state[action.payload.name] = action.payload.value
        }
    },
    extraReducers(builder) {
        // adding a car
        builder.addCase(addCarAsync.pending, state => {
            state.loading = true
        })
        builder.addCase(addCarAsync.fulfilled, state => {
            state.loading = true
        })
        builder.addCase(addCarAsync.rejected, state => {
            state.loading = true
        })
    }
})

const carsListSlice = createSlice({
    name: 'carsList',
    initialState: {
        cars: [],
        loading: false,
        error: ''
    },
    reducers: {
        addCarSync(state, action) {
            state.push(action.payload)
        }
    },
    extraReducers(builder) {
        // observing adding a car
        builder.addCase(addCarAsync.fulfilled, (state, action) => {
            state.loading = false
            state.cars.push(action.payload)
        });

        // fetching cars
        builder.addCase(fetchCars.pending, (state, action) => {
            state.loading = true
            state.error = ''
        });
        builder.addCase(fetchCars.fulfilled, (state, action) => {
            action.payload.forEach(car => {
                car.id = car._id
                delete car._id
            })
            state.loading = false
            state.cars = action.payload
        });
        builder.addCase(fetchCars.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        });

        // deleting a car
        builder.addCase(deleteCar.pending, (state, action) => {
            state.loading = true
            state.error = ''
        });
        builder.addCase(deleteCar.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loading = false
            state.cars = state.cars.filter(car => car.id !== action.payload.id)
        });
        builder.addCase(deleteCar.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        });
    }
})

// export const { changeInput } = carsSlice.actions
export const carsInputActions = carsFormSlice.actions
export const carsFormReducer = carsFormSlice.reducer

export const carsListActions = carsListSlice.actions
export const carsListReducer = carsListSlice.reducer