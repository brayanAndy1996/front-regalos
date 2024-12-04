
import { setFavorites } from './';
import { updateFavoritesGifts } from '@/service/userProvider';
import { differenceBetweenArrays } from '@/helpers/transformArrays';

export const setGiftFavorite = (productsFavorites: []) => {
    return async( dispatch: any ) => {
        dispatch( setFavorites({productsFavorites}) );
    }
}


export const addGiftFavorite = (idGift: string, operation: string) => {
    return async( dispatch: any, getState: any ) => {
        const { regalos } = getState();
        const addInFavorites = [...new Set([...regalos.productsFavorites, idGift])]
        const removeInFavorites = differenceBetweenArrays(regalos.productsFavorites, [idGift])
        const productsFavorites = operation === '+' ? addInFavorites : removeInFavorites
        
        const { productsFavorites: prodcutsFavs } = await updateFavoritesGifts(productsFavorites as [])
        dispatch( setFavorites({productsFavorites:prodcutsFavs}))
        // const result = await singInWithGoogle()

    }
}
