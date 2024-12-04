import { createSlice } from '@reduxjs/toolkit';

export const regalosSlice = createSlice({
    name: 'regalos',
    initialState: {
        productsFavorites: []
    },
    reducers: {
        initialRegalos: ( state ) => {
            state.productsFavorites = []
        },
        setFavorites: ( state, { payload } ) => {
            localStorage.setItem('productsFavorites', JSON.stringify(payload.productsFavorites) as string)
            state.productsFavorites = payload.productsFavorites
        }
    }
});


// Action creators are generated for each case reducer function
export const { setFavorites, initialRegalos } = regalosSlice.actions;