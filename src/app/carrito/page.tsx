'use client'
import { useEffect, useCallback, useState, useRef } from 'react'
import { Badge, Avatar } from "@nextui-org/react";
import ProductApi from '@/apis/Product'
import CajaRegalo from './components/CajaRegalo';
import ImageRegalo from './components/ImageRegalo';
import { CartIcon } from '@/icons/CartIcon';

const CarritoPage = () => {
    const [regalos, setRegalos] = useState([])
    const [regalosSelecteds, setRegalosSelecteds] = useState([])
    console.log("🚀 ~ CarritoPage ~ regalosSelecteds:", regalosSelecteds)
    console.log("🚀 ~ CarritoPage ~ regalos:", regalos)
    const dropZoneRef = useRef<any>(null);
    const getProducts = useCallback(async () => {
        try {
            const email = localStorage.getItem('email')
            const { productos } = await ProductApi.fetchProducts({
                categoria: '',
                emailUser: email
            })
            const productsAdapted = productos.map((product: any) => ({
                url: product.movimientos[0]?.direccion + product.movimientos[0]?.nombre,
                name: product.nombre,
                descripcion: product.descripcion,
                precio: product.precio,
                stock: product.stock,
                id: product._id
            }))
            setRegalos(productsAdapted)
        } catch (error) {
            console.log(error);
        }
    }, [])

    const addRegalosHandle = (regalo: any) => {
        setRegalosSelecteds((old): any => ([...old, regalo]))
    }

    useEffect(() => {
        getProducts()
    }, [getProducts])

    return (
        <div className='w-full h-full p-2'>
            <h3 className='text-3xl font-bold text-blue-500 mb-10 text-center'>TUS REGALOS FAVORITOS</h3>
            <div className='w-2/3 grid grid-cols-4 gap-4'>
                {
                    regalos.map((regalo: any) => (
                        <ImageRegalo dropZoneRef={dropZoneRef} regalo={regalo} addRegalosHandle={addRegalosHandle} key={regalo.id} />
                    ))
                }
            </div>

            <div
                ref={dropZoneRef}
                className='absolute bottom-0 right-0'
            >
                <CajaRegalo regalosSelecteds={regalosSelecteds} />
            </div>
            <div className='absolute bottom-10 right-10'>
                <Badge color="danger" content={regalosSelecteds.length}  shape="circle">
                    <CartIcon size={50} />
                </Badge>
            </div>

        </div>
    )
}

export default CarritoPage