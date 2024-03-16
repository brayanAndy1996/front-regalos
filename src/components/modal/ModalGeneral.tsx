import { useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider
} from '@nextui-org/react'

interface Props {
  children: React.ReactNode
  isOpen: boolean
  buttonOpen: React.ReactNode
  onOpenChange: (e: boolean) => void
  actionOnOpenModal?: () => void
  actionOnCloseModal?: () => void
  title?: string
  tamano?:
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'full'
}

export default function ModalGeneral ({
  isOpen,
  actionOnOpenModal,
  actionOnCloseModal,
  onOpenChange,
  buttonOpen,
  children,
  title,
  tamano = 'md'
}: Props): any {
  useEffect(() => {
    if (isOpen && actionOnOpenModal) actionOnOpenModal()
    return () => {
      if (isOpen && actionOnCloseModal) actionOnCloseModal()
    }
  }, [isOpen, actionOnOpenModal, actionOnCloseModal])

  return (
    <>
      {buttonOpen}
      <Modal
        // backdrop="blur" 
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={tamano}
        classNames={{
          base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40'
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1 pb-0'>
                {title ?? 'Titulo Modal'}
              </ModalHeader>
              <Divider className='w-11/12 mx-auto' />
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
