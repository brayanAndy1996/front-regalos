import { useState, useMemo } from 'react';
import { Card, Image, Button } from "@nextui-org/react";
import { motion } from 'framer-motion';
import ModalGeneral from "@/components/modal/ModalGeneral";
import useModal from "@/hooks/useModal";
import { useForm } from '@/hooks/useForm'
import { type FormValidationsType } from '@/helpers/types'
import InputComponent from '@/components/input/Input'
import { SiguienteIcon } from '../../../icons/SiguienteIcon'
import { AnteriorIcon } from '../../../icons/AnteriorIcon'
import toasts from '@/helpers/toast';
import ProductApi from '@/apis/Product';
import styles from '../CarritoPageStyle.module.css'

const initialData = {
    numero: '',
    nombre: '',
    vencimiento: '',
    pin: ''
}

const ViewGifts = ({ regalosSelecteds, price }: any) => (
    <div className="w-full">
        <div className='grid grid-cols-4 gap-4'>
            {
                regalosSelecteds.map((regalo: any) => (
                    <div key={regalo.id}>
                        <Card
                            className="h-3/4 w-11/12 mx-auto"
                        >
                            <div className="flex justify-center items-center h-full w-full">
                                <Image
                                    alt="Woman listing to music"
                                    src={regalo.url}
                                />
                            </div>
                        </Card>

                        <div
                            className="flex justify-around items-center mt-2"
                        >
                            <div>
                                <p>{regalo.name?.toLocaleLowerCase()}</p>
                                <p>S/. {regalo.precio}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        <p className='text-blue-500 text-right text-xl'>Total: <span className='font-extrabold'> S/. {price}</span></p>
        <div>

        </div>
    </div>
)

const PagarGifts = ({ price }: any) => {
    const validations: FormValidationsType = {
        numero: [(value: string) => value.length > 15, 'Numero de targeta invalido'],
        nombre: [(value: string) => value.length > 1, 'Nombre invalido'],
        vencimiento: [(value: string) => value.length > 1, 'fecha de vencimiento invalido'],
        pin: [(value: string) => value.length > 1, 'pin invalido']
    }
    const { formState, onInputChange, formErrorsValidation } = useForm(
        initialData,
        validations
    )
    return (
        <div className='w-full'>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.cardInner}>
                        <div className={styles.front}>
                            <Image src="https://i.ibb.co/PYss3yv/map.png" className={styles.mapImg} />
                            <div className={styles.row}>
                                <img src="https://i.ibb.co/G9pDnYJ/chip.png" width="60px" />
                                <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="60px" />
                            </div>
                            <div className={`${styles.row} ${styles.cardNo}`}>
                                <p>{formState.numero?.slice(0, 4) || 5244}</p>
                                <p>{formState.numero?.slice(4, 8) || 4215}</p>
                                <p>{formState.numero?.slice(8, 12) || 1825}</p>
                                <p>{formState.numero?.slice(12, 16) || 6420}</p>
                            </div>
                            <div className={`${styles.row} ${styles.cardholder}`}>
                                <p>NÚMERO DE TARJETA</p>
                                <p>VENCIMIENTO</p>
                            </div>
                            <div className={`${styles.row} ${styles.name}`}>
                                <p>{formState.nombre?.toUpperCase() || 'JOE DONE'}</p>
                                <p>{formState.vencimiento || '10 / 25'}</p>
                            </div>
                        </div>
                        <div className={styles.back} >
                            <Image src="https://i.ibb.co/PYss3yv/map.png" className={styles.mapImg} />
                            <div className={styles.bar}></div>
                            <div className={`${styles.row} ${styles.cardCvv}`}>
                                <div>
                                    <Image src="https://i.ibb.co/S6JG8px/pattern.png" />
                                </div>
                                <p>{formState.pin || '824'}</p>
                            </div>
                            <div className={`${styles.row} ${styles.signature}`}>
                                <p>FIRMA USANDO PIN</p>
                                <Image src="https://i.ibb.co/WHZ3nRJ/visa.png" width="80px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-4/5 mx-auto grid grid-cols-2 gap-4 mt-10'>
                <InputComponent
                    label='Número de tarjeta'
                    name='numero'
                    value={formState.numero}
                    onChange={onInputChange}
                    formErrorsValidation={formErrorsValidation}
                    placeholder='5244215182526420'
                    size='md'
                    color='primary'
                    variant='underlined'
                    classNameComponent='mb-4 mx-auto w-full'
                />
                <InputComponent
                    label='Nombre de la tarjeta'
                    name='nombre'
                    value={formState.nombre}
                    onChange={onInputChange}
                    formErrorsValidation={formErrorsValidation}
                    placeholder='JOE DONE'
                    size='md'
                    color='primary'
                    variant='underlined'
                    classNameComponent='mb-4 mx-auto w-full'
                />
                <InputComponent
                    label='Fecha de vencimiento'
                    name='vencimiento'
                    value={formState.vencimiento}
                    onChange={onInputChange}
                    formErrorsValidation={formErrorsValidation}
                    placeholder='10/25'
                    size='md'
                    color='primary'
                    variant='underlined'
                    classNameComponent='mb-4 mx-auto w-full'
                />
                <InputComponent
                    label='Pin'
                    name='pin'
                    value={formState.pin}
                    onChange={onInputChange}
                    formErrorsValidation={formErrorsValidation}
                    placeholder='824'
                    size='md'
                    color='primary'
                    variant='underlined'
                    classNameComponent='mb-4 mx-auto w-full'
                />
            </div>
            <p className='text-blue-500 text-right text-xl'>Total: <span className='font-extrabold'> S/. {price}</span></p>
        </div>
    )
}

const CompraExitosa = ({ price }: any) => {
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <Image src='/images/logoregalo.jpeg' alt='img' width='400' />
            <div>
                <p className='text-black text-2xl font-bold'>¿Desea comprar los productos?</p>
                <p className='text-center font-bold'>El total es de <span className='text-blue-800'>S/. {price}</span></p>
            </div>
        </div>
    )
}

const ButtonsConfirm = ({ handlePrevious, handleNext, currentView, views, price, close, regalosSelecteds }: any) => {
    return (
        <div className="w-full flex gap-4 justify-around items-center my-8">
            <Button
                color="danger"
                variant="bordered"
                startContent={<AnteriorIcon />}
                className='px-8'
                aria-label="anterior"
                onPress={handlePrevious}
                isDisabled ={currentView === 0}
            >
                Atrás
            </Button>
            <Button
                color="success"
                variant="bordered"
                endContent={<SiguienteIcon />}
                aria-label="siguiente"
                onPress={async()=>{
                    if(currentView === views.length - 1){
                       try {
                        await Promise.all(regalosSelecteds.map( (product: any)=>(
                            ProductApi.updateProduct(product.id, 
                                {
                                    ...product,
                                    stock: product.stock - 1
                                })
                        )))
                        toasts.success(`Su compra por ${price} fue hecha`)
                       } catch (error) {
                        toasts.error('No se actualizo los stocks')
                       } finally{
                        close()
                       }
                    }else{
                        handleNext()
                    }
                }}
            >
                {currentView === views.length - 1 ?'Comprar':'Siguiente'}
            </Button>
        </div>
    )
}

const CajaRegalo = ({ regalosSelecteds }: any) => {
    const { isOpen, open, onOpenChange, close } = useModal()
    const [currentView, setCurrentView] = useState(0)
    const onOpenModal = (): void => {
        console.log('abierto')
    }

    const onCloseModal = (): void => {
        console.log('cerrado')
    }

    const price = useMemo(() => regalosSelecteds.reduce((accumulator: any, currentValue: any) => {
        const priceNow = parseFloat(currentValue.precio) || 0
        return accumulator + priceNow
    }, 0), [regalosSelecteds])

    const views = [
        <ViewGifts key="view-gifts" regalosSelecteds={regalosSelecteds} price={price} />,
        <PagarGifts key="pagar-gifts" price={price} />,
        <CompraExitosa key="compra-exitosa" price={price}/>
    ]

    const handleNext = () => {
        setCurrentView((prev) => (prev + 1) % views.length)
    }

    const handlePrevious = () => {
        setCurrentView((prev) => (prev - 1 + views.length) % views.length)
    }

    const pageVariants = {
        initial: { opacity: 0, x: "100%" },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: "-100%" }
    }

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    }

    return (
        <div
            onClick={open}
        >

            <ModalGeneral
                isOpen={isOpen}
                buttonOpen={<Image
                    alt='regalo_caja'
                    src="/images/caja_regalo.png"
                    width='400'
                    draggable={false}
                    style={{
                        pointerEvents: 'none',
                        userSelect: 'none',
                        WebkitUserSelect: 'none'
                    }}
                />}
                onOpenChange={onOpenChange}
                actionOnOpenModal={onOpenModal}
                actionOnCloseModal={onCloseModal}
                scrollBehavior='inside'
                title='Sus regalos estan listos para la compra'
                tamano='5xl'
            >
                <div className={styles.general}>
                    <motion.div
                        key={currentView}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                        className='w-full'
                    >
                        {views[currentView]}
                    </motion.div>

                    <ButtonsConfirm
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        currentView={currentView}
                        views={views}
                        price={price}
                        close={close}
                        regalosSelecteds={regalosSelecteds}
                    />

                </div>
            </ModalGeneral>
        </div>
    );
};

export default CajaRegalo;