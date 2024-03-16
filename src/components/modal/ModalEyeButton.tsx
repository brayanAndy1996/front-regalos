import { Button, Tooltip } from '@nextui-org/react'
import { Barlow } from 'next/font/google'
import { EyeIcon } from '@/icons/EyeIcon'
import ModalGeneral from '@/components/modal/ModalGeneral'
import useModal from '@/hooks/useModal'

interface Props {
  children: React.ReactNode
  title?: string
  tamano?:
  | '4xl'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xs'
  | 'xl'
  | '2xl'
  | '3xl'
  | '5xl'
  | 'full'
  | undefined
}
const inter = Barlow({ weight: '400', subsets: ['latin'] })
const ModalEyeButton = ({
  children,
  title = 'Detalles',
  tamano = '4xl'
}: Props): JSX.Element => {
  const { isOpen, open, onOpenChange } = useModal()
  const eyeButtonOpen = (
    <Tooltip content='detalles' color='default' size='sm' closeDelay={150}>
      <Button
        isIconOnly
        color='default'
        variant='light'
        radius='full'
        onPress={open}
      >
        <EyeIcon />
      </Button>
    </Tooltip>
  )

  return (
    <>
      <ModalGeneral
        isOpen={isOpen}
        buttonOpen={eyeButtonOpen}
        onOpenChange={onOpenChange}
        title={title}
        tamano={tamano}
      >
        <div className={inter.className}>{children}</div>
      </ModalGeneral>
    </>
  )
}

export default ModalEyeButton
