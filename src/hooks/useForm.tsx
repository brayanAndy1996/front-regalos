'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { deleteFalsys } from '../helpers/transformObjects'
import { type FormValidationsType } from '@/helpers/types'

type FormStateType = Record<string, any>

export const useForm = (
  initialForm: FormStateType = {},
  formValidations: FormValidationsType = {}
): any => {
  const [formState, setFormState] = useState(initialForm)
  const [formValidation, setFormValidation] = useState({})

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): any => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onInputChangeNoName = (value: FormStateType): any => {
    setFormState({
      ...formState,
      ...value
    })
  }

  const formatearFormState = (): void => {
    setFormState(initialForm)
  }

  const formErrorsValidation: any = useMemo(
    () => deleteFalsys(formValidation),
    [formValidation]
  )

  const validations = useCallback(() => {
    const messagesErrorToValidations: Record<string, string | null> = {}
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMesagge] = formValidations[formField]
      messagesErrorToValidations[formField] = fn(formState[formField] ?? '')
        ? null
        : errorMesagge
    }
    setFormValidation(messagesErrorToValidations)
  }, [formState])
  
  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])

  useEffect(() => {
    validations()
  }, [validations])

  return {
    formState,
    onInputChange,
    formErrorsValidation,
    formatearFormState,
    onInputChangeNoName
  }
}
