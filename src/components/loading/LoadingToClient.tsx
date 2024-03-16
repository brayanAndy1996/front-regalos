import { Spinner } from '@nextui-org/react'

const LoadingToClient = ({
  children,
  isLoading,
  messageLoading = 'Cargando...'
}: {
  children: React.ReactNode
  isLoading: boolean
  messageLoading?: string
}): JSX.Element => {
  return isLoading 
    ? (
        <div className='w-full h-full relative'>
          <div className='flex justify-center items-center w-full h-full text-2xl text-default-500 backdrop-blur-sm absolute z-50'>
            <Spinner 
              label={messageLoading}
              color='primary'
              labelColor='primary'
              size='lg'
            />
          </div>
          {children}
        </div> 
      ) 
    : (
        <>{children}</>
      )
}

export default LoadingToClient
