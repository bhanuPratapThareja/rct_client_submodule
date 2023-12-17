import { createSlice } from '@reduxjs/toolkit'
import { createUser } from '../thunks/userThunk'

const INITIAL_USER_STATE = {
    userName: '',
    email: '',
    aquisitionChannel: [],
    gender: '',
    profile: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: INITIAL_USER_STATE,
        isSubmitting: false,
        isLoggedIn: false,
        error: '',
        token: ''
    },
    reducers: {
        logoutUser(state) {
            state.user = INITIAL_USER_STATE
            state.token = ''
            state.isLoggedIn = false
        },
        setUser(state, action) {
           state.user = action.payload
           state.isLoggedIn = true
        }
    },
    extraReducers(builder) {
        builder.addCase(createUser.pending, state => {
            state.isSubmitting = true
            state.error = ''
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isSubmitting = false
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true
        })
        builder.addCase(createUser.rejected, (state, action) => {
            console.log('action:: ', action)
            state.isSubmitting = false
            state.error = action.error
        })
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer