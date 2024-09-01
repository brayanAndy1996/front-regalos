import { toast, type ToastOptions } from 'react-toastify'

const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
}

const toasts = {
  success: (message: string) => toast.success(message, defaultToastOptions),
  error: (message: string) => toast.error(message, defaultToastOptions),
  info: (message: string) => toast.info(message, defaultToastOptions),
  warn: (message: string) => toast.warn(message, defaultToastOptions)
}

export default toasts
