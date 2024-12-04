import { createSlice } from '@reduxjs/toolkit';
interface FiltersState {
    precios: {
      values: [number, number];
      ranges: { min: number; max: number };
    };
    liked: boolean;
    clasification: 'a-z' | 'z-a' | '-+' | '+-';
  }
  
  const initialState: FiltersState = {
    precios: {
      values: [0, 100],
      ranges: { min: 0, max: 500 },
    },
    liked: false,
    clasification: 'a-z',
  };
export const filtesSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // initialRegalos: ( state ) => {
        //     // state.productsFavorites = []
        // },
        setNewValuesPrecios: ( state, { payload } ) => {
            state.precios.values = payload.precios
        },
        setLiked: ( state, { payload } ) => {
            state.liked = payload.liked
        },
        setClasification: ( state, { payload } ) => {
            state.clasification = payload.clasification
        }
    }
});


// Action creators are generated for each case reducer function
export const { setNewValuesPrecios, setLiked, setClasification } = filtesSlice.actions;