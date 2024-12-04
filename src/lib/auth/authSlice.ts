import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        role: null,
        token: null,
        errorMessage: [],
        productsFavorites: null
    },
    reducers: {
        login: ( state, { payload } ) => {
            state.status = 'authenticated' // 'checking', 'not-authenticated', 'authenticated'
            state.uid = payload.uid
            state.email = payload.email
            state.role = payload.role
            state.token = payload.token
            state.errorMessage = payload.errorMessage
            state.productsFavorites = payload.productsFavorites
        },
        logout: ( state, { payload } ) => {
            state.status = 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = null
            state.email = null
            state.role = null
            state.token = null
            state.errorMessage = payload?.errorMessage || [];
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
        setFavorites: ( state, { payload } ) => {
            state.productsFavorites = payload.productsFavorites
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials, setFavorites } = authSlice.actions;