import { Button, Tooltip } from '@nextui-org/react'
import { EditIcon } from '@/icons/EditIcon'
import ModalGeneral from '../modal/ModalGeneral'

interface Props {
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: (e: boolean) => void
  open: () => void
  titleModal?: string
  tooltip?: string
  sizeModal?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  labelButton?: string
}

const EditButtonModal = (
  {
    children,
    isOpen,
    onOpenChange,
    open,
    tooltip = 'Editar Usuario',
    titleModal = 'Editar Usuario',
    sizeModal = 'xl',
    labelButton
  }: Props
): any => {
  const buttonToOpen = (
    labelButton 
      ? <Button  
            color="primary" 
            variant="ghost" 
            radius="full"
            onPress={open} 
            endContent={<EditIcon/>}
        >
            {labelButton}
        </Button>  
      : <Tooltip content={ tooltip ?? 'Editar Usuario' } color='primary' size='sm' closeDelay={150}>
            <Button 
                isIconOnly 
                color="primary" 
                variant="ghost" 
                radius="full"
                onPress={open}
            >
                <EditIcon />
            </Button>
        </Tooltip> 
  )

  return (
        <>
            <ModalGeneral
                isOpen={isOpen}
                buttonOpen={buttonToOpen}
                onOpenChange={onOpenChange}
                title={titleModal ?? 'Editar Usuario'}
                tamano={sizeModal ?? 'xl'}
            >
                { children }
            </ModalGeneral>
        </>
  )
}
export default EditButtonModal
