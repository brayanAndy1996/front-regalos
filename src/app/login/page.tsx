'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { Inconsolata } from 'next/font/google'
import { Card, CardBody, Button, Checkbox, Link } from '@nextui-org/react'
import InputComponent from '@/components/input/Input'
import { type FormValidationsType } from '@/helpers/types'
import { useForm } from '@/hooks/useForm'
import { EyeFilledIcon } from '@/icons/EyeFilledIcon'
import { EyeSlashFilledIcon } from '@/icons/EyeSlashFalledIcon'
import Image from 'next/image'
import toasts from '@/helpers/toast'
import Auth from '@/apis/Auth'
import { setGiftFavorite } from '@/lib/regalos'
import { useAppDispatch } from '@/lib/hooks'

const inconsolata = Inconsolata({ subsets: ['latin'] })
const initialData = {
  email: '',
  password: ''
}
interface FormStateType {
  email: string
  password: string
}
interface responseLoginType {
  token: string
  usuario: {
    role: {
      name: string
    }
    uid: string
    productsFavorites: []
  }
}

const page = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const validations: FormValidationsType = {
    email: [(value: string) => value.includes('@'), 'Email invalido'],
    password: [(value: string) => value.length > 3, 'Password invalido']
  }
  const { formState, onInputChange, formErrorsValidation } = useForm(
    initialData,
    validations
  )
  const [isVisible, setIsVisible] = useState(false)
  // const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  // const [isDisabledLink, setIsDisabledLink] = useState(true)
  const router = useRouter()
  const login = async (): Promise<void> => {
    try {
      // setIsLoadingLogin(true)
      const response: responseLoginType = await Auth.login(
        formState as FormStateType
      )
      toasts.success('Logeo correcto, entrando ...')
      localStorage.setItem('token', response.token)
      localStorage.setItem('role', response.usuario?.role?.name)
      localStorage.setItem('email', formState.email as string)
      dispatch(setGiftFavorite(response.usuario.productsFavorites))
      router.push('/peluches') 
    } catch (error) {
      console.log(error) 
      if (error instanceof AxiosError) {
        const errors = error.response?.data?.errors
        if (errors) {
          errors.forEach((error: string) => {
            toasts.error(error)
          }) 
        }
      } else {
        toasts.error('Error en el login')
      }
    } finally {
      // setIsLoadingLogin(false)
    }
  }

  const toggleVisibility = (): void => {
    setIsVisible(!isVisible)
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
      <Card className='md:w-3/5 w-11/12' isBlurred>
        <CardBody className='overflow-visible py-8 mx-auto w-11/12'>
          <div className='md:flex flex-row gap-3'>
            <div>
              <div className='flex flex-col justify-center items-center mb-16'>
                <Image
                  src='/images/logoregalo.jpeg'
                  alt='Intranet'
                  width={259}
                  height={250}
                />
                <p
                  className={
                    inconsolata.className + ' text-2xl font-black mt-4'
                  }
                >
                  Bienvenido
                </p>
                <p className={inconsolata.className}>
                  Inicie sesión en su cuenta para continuar
                </p>
              </div>
              <InputComponent
                label='Correo Electronico'
                name='email'
                value={formState.email}
                onChange={onInputChange}
                formErrorsValidation={formErrorsValidation}
                placeholder='example@gmail.com'
                size='md'
                color='primary'
                variant='underlined'
                classNameComponent='mb-4 mx-auto w-full'
              // onBlur={async () => {
              //   try {
              //     if (formState.email) {
              //       const { usuarios: user } = await UserApi.fetchUserRoleByFilters({ term: formState.email, key: 'email' })
              //       if (user.length > 0 && user[0]._id === '664244e1a8bd447cc2452ea4') setIsDisabledLink(false)
              //     }
              //   } catch (error) {
              //     console.log(error)
              //   }
              // }}
              />
              <InputComponent
                label='Contraseña'
                name='password'
                placeholder='Ingrese su contraseña'
                classNameComponent='mb-6 mx-auto w-full'
                value={formState.password}
                onChange={onInputChange}
                formErrorsValidation={formErrorsValidation}
                size='md'
                color='primary'
                variant='underlined'
                endContent={
                  <button
                    className='focus:outline-none'
                    type='button'
                    onClick={toggleVisibility}
                  >
                    {isVisible
                      ? (
                        <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                      )
                      : (
                        <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                      )}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
              />
              <div className='flex justify-between mb-6'>
                <Checkbox defaultSelected>Recordar</Checkbox>
                <Link
                  href='#'
                  color='foreground'
                // isDisabled={isDisabledLink}
                // onPress={() => {
                //   const data = { email: formState.email }
                //   Auth.reset(data)
                //     .then(() => toasts.success(`Se envio un correo a  ${data.email}`))
                //     .catch(() => toasts.error('Error al enviar correo'))
                // }}
                >
                  ¿Olvido su contraseña?
                </Link>
              </div>
              <Button
                className='w-full'
                color='primary'
                variant='shadow'
                // isLoading={isLoadingLogin}  
                onClick={() => {
                  login().catch(error => {
                    console.log(error)
                  })
                }}
              >
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default page
