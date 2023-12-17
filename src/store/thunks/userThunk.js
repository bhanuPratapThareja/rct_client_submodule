import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createUser = createAsyncThunk('user/create', async request => {
    const { userData, mode } = request
    try {
        const response = await axios.post(`http://localhost:3001/auth/${mode}`, userData, {
            headers: {
                'AA': 'BB'
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})