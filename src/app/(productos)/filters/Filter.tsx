'use client'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setGiftFavorite } from "@/lib/regalos"
import FilterPrice from "./FilterPrice"
import Rating from "./Rating"
import TabsOrder from "./TabsOrder"
import SelectClasificar from "./SelectClasificar"
import styles from '../StylesGenereal.module.css'


const Filter = () => {
  
  const dispatch = useAppDispatch()
  const { productsFavorites } = useAppSelector( state => state.regalos );
  useEffect(() => {
    const token = localStorage.getItem('token')
    const productsFavoritesStorage = JSON.parse(localStorage.getItem("productsFavorites") ?? "[]")
    if(Boolean(token) && productsFavoritesStorage.length > 0 && productsFavorites.length === 0){
      dispatch(setGiftFavorite(productsFavoritesStorage))
    }
  }, [])
  
  return (
    <div className={ styles.carFilter + ' w-48 basis-1/5 p-8 sticky top-16'}>
          <p className="font-extrabold text-lg text-default-400">Personalice su busqueda</p>
          <div className="h-2/3 flex flex-col gap-y-10">
            <FilterPrice/>
              <Rating/>
              <TabsOrder/>
              <SelectClasificar/>
          </div>
        </div>
  )
}

export default Filter