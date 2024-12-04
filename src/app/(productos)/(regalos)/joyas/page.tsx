'use client'
import GridMain from "../../components/pageComponent/GridMain"
import { useGetProducts } from "@/hooks/useGetProducts"

const PageJoyas = () => {
  const {productosFiltrados} = useGetProducts()
  return (
    <GridMain
    products={productosFiltrados}
  />
  )
}

export default PageJoyas