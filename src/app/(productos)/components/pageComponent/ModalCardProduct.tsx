import { Image, Button } from "@nextui-org/react";
import ModalGeneral from "@/components/modal/ModalGeneral";
import { StarIcon } from "@/icons/StartIcon";
import ButtonLikeHeart from "@/components/buttons/ButtonLikeHeart";
import style from './MainPageStyle.module.css'

const ModalCardProduct = ({ isOpen, onOpenChange, product }: any) => {
    const starts = [1, 2, 3, 4, 5]
    const onOpenModal = (): void => {
        console.log('abierto')
    }

    const onCloseModal = (): void => {
        console.log('cerrado')
    }
    return (
        <ModalGeneral
            isOpen={isOpen}
            buttonOpen={<></>}
            onOpenChange={onOpenChange}
            actionOnOpenModal={onOpenModal}
            actionOnCloseModal={onCloseModal}
            title={product.name}
            tamano='xl'
        >
            <div className="flex w-full ">
                <Image
                    alt={product.name}
                    className={style.imageModal}
                    src={product.url}
                />
                <div className="flex flex-col justify-between">
                    <p className="font-normal text-sm text-black">{product.descripcion}</p>
                    <div className="flex">
                        <p className={style.txtPrice + ' basis-1/2'}>S/. <span className="font-normal">{product.precio}</span></p>
                        <p className={style.txtPrice}>Stock: <span className="font-normal">{product.stock}</span></p>
                    </div>
                    <div>
                        <p className={style.txtPrice}>Rating</p>
                        {
                            starts.map((start: number) => {
                                return (
                                    <Button
                                        isIconOnly
                                        aria-label="start"
                                        className="bg-transparent"
                                        key={start}
                                    >
                                        <StarIcon fill='#006fee' filled='fill' />
                                    </Button>
                                )
                            })
                        }
                    </div>
                    <div className="flex justify-end">
                        <ButtonLikeHeart idProduct={product.id}/>
                    </div>

                </div>
            </div>
        </ModalGeneral>
    )
}

export default ModalCardProduct