'use client'

import { useState } from 'react'
import { Card, CardBody } from '@nextui-org/react'
import InputComponent from '@/components/input/Input'

const page = (): JSX.Element => {
  const [formState, setFormState] = useState({ name: '', fecha: '' })
  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <Card className="w-1/4" isBlurred>
        <CardBody className="overflow-visible py-2">
        <div className='w-40'>
            <InputComponent
            label='Nombre'
            value={formState.name}
            //   color='danger'
            //   isInvalid
            //   errorMessage='Error'
            onChange={(v: any) => {
              setFormState({ ...formState, name: v })
            }}
            />
        </div>
        </CardBody>
    </Card>
    </div>
  )
}

export default page
