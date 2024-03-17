'use client'
import React, { useState } from 'react'
import { Button } from '@nextui-org/react'
import ModalGeneral from '@/components/modal/ModalGeneral'
import useModal from '@/hooks/useModal'
import EditButtonModal from '@/components/buttons/EditButtonModal'
import DeleteSimpleButton from '@/components/buttons/DeleteSimpleButton'
import DatePickerOld from '@/components/dates/DatePickerSingle'
import DatePickerRange from '@/components/dates/DatePickerRange'

const PageModal = (): JSX.Element => {
  const { isOpen, open, onOpenChange, close } = useModal()
  const {
    isOpen: isOpenB,
    open: openB,
    onOpenChange: onOpenChangeB,
    close: closeB
  } = useModal()
  const [date2, setDate2] = useState('')
  console.log('🚀 ~ file: page.tsx:20 ~ PageModal ~ date2:', date2)
  const [date, setDate] = useState('')
  console.log('🚀 ~ file: page.tsx:20 ~ PageModal ~ date:', date)

  const onOpenModal = (): void => {
    console.log('abierto')
  }

  const onCloseModal = (): void => {
    console.log('cerrado')
  }

  return (
    <div>
      <ModalGeneral
        isOpen={isOpen}
        buttonOpen={<Button onPress={open}>Open Modal</Button>}
        onOpenChange={onOpenChange}
        actionOnOpenModal={onOpenModal}
        actionOnCloseModal={onCloseModal}
        title='Titulo Modal2'
        tamano='xl'
      >
        <div>
          <p>test</p>
          <div>
            <Button color='danger' variant='light' onPress={close}>
              Close
            </Button>
            <Button color='primary' onPress={close}>
              Action
            </Button>
          </div>
        </div>
      </ModalGeneral>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe animi
        ipsum, veritatis et, explicabo doloremque reiciendis quas sit
        reprehenderit pariatur, incidunt itaque atque quos veniam. Aut repellat
        deleniti illum similique.
      </div>
      <div className='ml-10'>
        <EditButtonModal
          isOpen={isOpenB}
          onOpenChange={onOpenChangeB}
          open={openB}
        >
          <div>
            <p>test</p>
            <div>
              <Button color='danger' variant='light' onPress={closeB}>
                Close
              </Button>
              <Button color='primary' onPress={closeB}>
                Action
              </Button>
            </div>
          </div>
        </EditButtonModal>
        <DeleteSimpleButton
          actionPress={() => {
            console.log('delete')
          }}
        />
      </div>
      <div className='w-60'>
        <DatePickerOld setDate={setDate} value='2023-11-16' />
      </div>
      <DatePickerRange setValue={setDate2} value={date2} />
    </div>
  )
}

export default PageModal
