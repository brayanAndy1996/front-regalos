// 'use client'
import { useState } from 'react'
import InputComponent from '@/components/input/Input'

const InputSinHook = (): JSX.Element => {
  const [formState, setFormState] = useState({ name: '', fecha: '' })

  return (
    <>
      <div className='w-40'>
        <InputComponent
          label='Nombre'
          value={formState.name}
          color='danger'
          isInvalid
          errorMessage='Error'
          onChange={(v: any) => {
            setFormState({ ...formState, name: v })
          }}
        />
      </div>
      <div className='w-40'>
        <InputComponent
          label='Fecha'
          value={formState.fecha}
          onChange={(v: any) => {
            setFormState({ ...formState, fecha: v })
          }}
          type='date'
        />
      </div>
    </>
  )
}

export default InputSinHook
