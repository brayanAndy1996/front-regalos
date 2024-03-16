import { useState } from 'react'

const useModal = (): any => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpenChange = (state: boolean): void => {
    !state ? setIsOpen(false) : setIsOpen(true)
  }
  return {
    isOpen,
    open: () => {
      setIsOpen(true)
    },
    close: () => {
      setIsOpen(false)
    },
    onOpenChange
  }
}
export default useModal
