'use client'
import GridMain from "../../components/pageComponent/GridMain"
import { useGetProducts } from "@/hooks/useGetProducts"
const PageOsoPeluche = () => {
  const {productosFiltrados} = useGetProducts()

  return (

    <GridMain
      products={productosFiltrados}
    />
  )
}

export default PageOsoPeluche