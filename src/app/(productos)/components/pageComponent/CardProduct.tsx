import { Card, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Agdasima } from 'next/font/google'
import style from './MainPageStyle.module.css'
import ButtonLikeHeart from "@/components/buttons/ButtonLikeHeart";
import ModalCardProduct from "./ModalCardProduct";
import useModal from "@/hooks/useModal";

const agdasima = Agdasima({ weight: "700", subsets: ['latin'] })

interface PropsCardProduct {
    product: { url: string, name: string, descripcion: string, precio: string, stock: number, id: string }
}

const CardProduct = ({ product }: PropsCardProduct): JSX.Element => {
    const { isOpen, open, onOpenChange } = useModal()
    return (
        <motion.div
            whileHover={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px', backgroundColor: 'rgba(0, 111, 238, 0.3)' }}
            transition={{ duration: 0.5 }}
            className={style.card + " flex flex-col content-around justify-around"}
            onClick={open}
        >
            <Card
                className="h-3/4 w-11/12 mx-auto"
            >
                <div className="flex justify-center items-center h-full w-full">
                    <Image
                        isZoomed
                        alt="Woman listing to music"
                        className={style.image}
                        src={product.url}
                    />
                </div>
            </Card>

            <div
                className="flex justify-around items-center mt-2"
            >
                <div className={agdasima.className}>
                    <p className={style.txt}>{product.name?.toLocaleLowerCase()}</p>
                    <p className={style.txtPrice}>S/. {product.precio}</p>
                    <ModalCardProduct isOpen={isOpen} onOpenChange={onOpenChange} product={product}/>
                </div>
                <ButtonLikeHeart idProduct={product.id}/>
            </div>
        </motion.div>
    )
}

export default CardProduct