import { type ColorFormType } from './types'

interface FormValidationsType {
  name: string
  formErrorsValidationExt: Record<string, any> | undefined
}

export const errorsValidation = ({
  formErrorsValidationExt,
  name
}: FormValidationsType): any => {
  const formErrorsValidation = formErrorsValidationExt ?? {}
  const isInvalid = Boolean(formErrorsValidation[name])
  const errorMessage = isInvalid && formErrorsValidation[name]
  const color: ColorFormType = isInvalid
    ? 'danger'
    : formErrorsValidationExt === undefined
      ? 'primary'
      : 'success'
  return { isInvalid, errorMessage, color }
}
