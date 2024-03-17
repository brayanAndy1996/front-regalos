'use client'
import { useState, useEffect } from 'react'
import Input from '@/components/input/Input'
import { useForm } from '@/hooks/useForm'
import { type FormValidationsType } from '@/helpers/types'
import AutoCompleteComponent from '@/components/input/AutoComplete'
import InputSinHook from './InputSinHook'
import LoadingToClient from '@/components/loading/LoadingToClient'

const animals: any = [
  {
    label: 'Cat',
    value: 'cat',
    description: 'The second most popular pet in the world'
  },
  {
    label: 'Dog',
    value: 'dog',
    description: 'The most popular pet in the world'
  },
  {
    label: 'Elephant',
    value: 'elephant',
    description: 'The largest land animal'
  },
  { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
  { label: 'Tiger', value: 'tiger', description: 'The largest cat species' },
  {
    label: 'Giraffe',
    value: 'giraffe',
    description: 'The tallest land animal'
  },
  {
    label: 'Dolphin',
    value: 'dolphin',
    description: 'A widely distributed and diverse group of aquatic mammals'
  },
  {
    label: 'Penguin',
    value: 'penguin',
    description: 'A group of aquatic flightless birds'
  },
  {
    label: 'Zebra',
    value: 'zebra',
    description: 'A several species of African equids'
  },
  {
    label: 'Shark',
    value: 'shark',
    description:
      'A group of elasmobranch fish characterized by a cartilaginous skeleton'
  },
  {
    label: 'Whale',
    value: 'whale',
    description: 'Diverse group of fully aquatic placental marine mammals'
  },
  {
    label: 'Otter',
    value: 'otter',
    description: 'A carnivorous mammal in the subfamily Lutrinae'
  },
  {
    label: 'Crocodile',
    value: 'crocodile',
    description: 'A large semiaquatic reptile'
  }
]
 
interface FormStateType {
  email: string
  name: string
  password: string
  number: number
  texto: string
  animal: string
  fecha: string
}

const initialData: FormStateType = {
  email: '',
  name: '',
  password: '',
  number: 3,
  texto: '',
  animal: 'cat',
  fecha: ''
}

export default function InputsPage (): JSX.Element {
  // NOTAS: Si se quiere validar un campo que no existe en el formulario, se debe agregar en el objeto de validaciones
  // Las propiedades del objeto de validaciones deben ser iguales a las propiedades del formulario(de los que quieres que se valide)

  const validations: FormValidationsType = {
    email: [(value: string) => value.includes('@'), 'Email invalido'],
    name: [
      (value: string) => value === 'comprobado cpp',
      'Solo puedes poner comprobado cpp'
    ],
    // email2:   [(value:string) =>  value === formState.email, 'Email 2 debe ser igual al primero'],
    password: [(value: string) => value.length > 3, 'Password invalido'],
    texto: [(value: string) => value.length > 3, 'Texto invalido'],
    animal: [(value: string) => value.length > 0, 'Animal invalido']
  }
  const [initialForm, setInitialForm] = useState(initialData)
  const [isLoadingInitial, setIsLoadingInitial] = useState(false)
  const { formState, onInputChange, formErrorsValidation } = useForm(
    initialForm,
    validations
  )

  const searchAnimal = async (text: string): Promise<any> => {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(
          animals.filter((animal: any) => {
            return animal.label.toLowerCase().includes(text.toLowerCase())
          })
        )
      }, 1000)
    })
  }

  useEffect(() => {
    console.log('sss')
    const getClient = async (id: string): Promise<any> => {
      try {
        setIsLoadingInitial(true)
        const response = await fetch(`http://localhost:5000/clients/${id}`)
        const data = await response.json()
        const delay = async (): Promise<void> => {
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
        // Espera 2 segundos antes de realizar la solicitud
        await delay()
        setInitialForm(data as FormStateType)
      } catch (error) {
        setInitialForm(initialData)
      } finally {
        setIsLoadingInitial(false)
      }
    }
    getClient('1').catch(() => {
      setInitialForm(initialData)
      setIsLoadingInitial(false)
    })
  }, [])
  
  return (
    <div className='w-full'>
      <LoadingToClient isLoading={ isLoadingInitial }>
        <div className='w-1/3 mx-auto grid grid-cols-2 gap-4'>
          {/* Nota: la prop name debe de ser igaul a la propiedad del valor que mandas en el value.
              Si hay validacion de formulario, se debe de mandar la prop formErrorsValidation para que se pueda validar
          */}
         <Input
            label='Email'
            name='email'
            value={formState.email}
            onChange={onInputChange}
            formErrorsValidation={formErrorsValidation}
            // startContent={<FullMoon />}
          />
          <Input
            label='Fecha'
            name='fecha'
            value={formState.fecha}
            onChange={onInputChange}
            type='date'
            // startContent={<FullMoon />}
          />
          <Input
            label='Name'
            name='name'
            value={formState.name}
            onChange={onInputChange}
            formErrorsValidation={formErrorsValidation}
            isClearable
          />
          <Input
            label='Password'
            name='password'
            value={formState.password}
            onChange={onInputChange}
            formErrorsValidation={formErrorsValidation}
            // endContent={<FullMoon />}
          />
          <Input
            label='Number'
            name='number'
            value={formState.number}
            onChange={onInputChange}
            type='number'
            min={2}
          />
          <Input
            label='Texto'
            name='texto'
            value={formState.texto}
            onChange={onInputChange}
            formErrorsValidation={formErrorsValidation}
            isClearable
            type='textarea'
          />
        </div>
      </LoadingToClient>
      <div className='w-40'>
        {/* Nota: la prop name debe de ser igaul a la propiedad del valor que mandas en el value.
              Si hay validacion de formulario, se debe de mandar la prop formErrorsValidation para que se pueda validar
          */}
        <AutoCompleteComponent
          label='Favorite animal'
          name='animal'
          codeKey='value'
          codeLabel='label'
          // options={animals}
          searchComplete={searchAnimal}
          formErrorsValidation={formErrorsValidation}
          value={formState.animal}
          onSelectionChange={onInputChange}
        />
      </div>
      <div className='w-40'>
        <InputSinHook />
      </div>
    </div>
  )
}
