import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addCarAsync = createAsyncThunk('cars/post', async ({ name, cost }) => {
    const response = await axios.post('http://localhost:3001/cars/add', { name, cost })
    console.log(response)
    return response.data
})

export const fetchCars = createAsyncThunk('cars/fetch', async () => {
    const response = await axios.get('http://localhost:3001/cars')
    return response.data
})

export const deleteCar = createAsyncThunk('cars/delete', async id => {
    console.log(id)
    const response = await axios.delete('http://localhost:3001/cars', {
        params: { id }
    })
    return response.data
})