import { Button, Tooltip } from '@nextui-org/react'
import { DeleteIcon } from '@/icons/DeleteIcon'

interface Props {
  actionPress: () => void
  tooltip?: string
}
const DeleteSimpleButton = ({
  tooltip = 'Eliminar',
  actionPress
}: Props): any => {
  return (
    <Tooltip content={ tooltip } color='danger' size='sm' closeDelay={150}>
         <Button 
            isIconOnly 
            color="danger" 
            variant="ghost" 
            radius="full"
            onPress={actionPress}
        >
            <DeleteIcon />
        </Button>
    </Tooltip>
  )
}
export default DeleteSimpleButton
