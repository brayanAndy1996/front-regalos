
import { useEffect, useCallback, useState, useMemo } from 'react'
import { useAppSelector } from "@/lib/hooks";
import { usePathname } from 'next/navigation'
import ProductApi from '@/apis/Product'
import toasts from '@/helpers/toast'
interface Product {
    name: string;
    precio: Number
}

export const useGetProducts = (): any => {
    const pathname = usePathname()
    const [productos, setProductos] = useState([])
    const { precios, liked, clasification } = useAppSelector(state => state.filters)
    const { productsFavorites } = useAppSelector(state => state.regalos)

    const isFavorite = useCallback(
        (id: string) => productsFavorites.includes(id as never),
        [productsFavorites]
    )


    const productosFiltrados = useMemo(() => {
        const filterByPriceAndFavorites = (product: any) =>
            product.precio >= precios.values[0] &&
            product.precio <= precios.values[1] &&
            (!liked || isFavorite(product.id))

        const sortByClasification = (a: Product, b: Product) => {
            const propertySelected: Record<'a-z' | 'z-a' | '-+' | '+-', keyof Product> = {
                "a-z": "name",
                "z-a": "name",
                "-+": "precio",
                "+-": "precio",
            }

            const valueA = a[propertySelected[clasification]]
            const valueB = b[propertySelected[clasification]]
            const orderSelected = {
                "a-z": [valueA, valueB],
                "z-a": [valueB, valueA],
                "-+": [valueA, valueB],
                "+-": [valueB, valueA],
            }

            if (orderSelected[clasification][0] < orderSelected[clasification][1]) return -1
            if (orderSelected[clasification][0] > orderSelected[clasification][1]) return 1
            return 0
        }

        return productos.filter(filterByPriceAndFavorites).sort(sortByClasification)
    }, [productos, liked, precios.values, clasification, isFavorite])

    const getProducts = useCallback(async () => {
        try {
            const categoria = pathname.slice(1)
            const { productos } = await ProductApi.fetchProducts({ categoria })
            const productsAdapted = productos.map((product: any) => ({
                url: product.movimientos[0]?.direccion + product.movimientos[0]?.nombre,
                name: product.nombre,
                descripcion: product.descripcion,
                precio: product.precio,
                stock: product.stock,
                id: product._id
            }))
            setProductos(productsAdapted)
        } catch (error) {
            console.log(error);
            setProductos([])
            toasts.error(`Los productos de la seccion ${pathname.slice(1)} no cargaron`)
        }
    }, [])

    useEffect(() => {
        getProducts()
    }, [getProducts])
    return {
        productosFiltrados
    }
}
