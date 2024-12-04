import { AxiosError } from "axios"
import Auth from "@/apis/Auth"
import UserApi from "@/apis/Users"
import { responseLoginType } from "@/helpers/types"

export const registerUserWithEmailPassword = async({password, email}:{password: string, email: string}) =>{
    try {
        const { usuario, token }: responseLoginType = await Auth.login({password, email})
        return {
            ok: true,
            token,
            email: usuario.email,
            role: usuario.role?.name,
            uid: usuario.uid,
            productsFavorites: usuario.productsFavorites
        }
    } catch (error) {
        console.log("🚀 ~ registerUserWithEmailPassword ~ error:", error)
        if (error instanceof AxiosError) {
          const errors = error.response?.data?.errors
          return { ok: false, errorMessage: errors }
         
        }
        return { ok: false, errorMessage: 'Error' }
    }
}

export const updateFavoritesGifts = async(productsFavorites: []): Promise<any> =>{
    try {
        const email = localStorage.getItem('email')
        if(email){
            const { data } = await UserApi.setProductFavorites(email, productsFavorites)
            return {
                ok: true,
                productsFavorites: data?.usuario?.productsFavorites
            }
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            const errors = error.response?.data?.errors
            return { ok: false, errorMessage: errors }
           
          }
          return { ok: false, errorMessage: 'Error' }
    }
    
}