import { ColorFormType } from "./types";

type FormValidationsType = {
    name:string;
    formErrorsValidationExt:{[key: string]: string | null} | undefined;
}

export const errorsValidation = ({formErrorsValidationExt, name}:FormValidationsType) =>{
    const formErrorsValidation = formErrorsValidationExt || {}
    const isInvalid             = Boolean(formErrorsValidation[name])
    const errorMessage          = isInvalid && formErrorsValidation[name]
    const color: ColorFormType      = isInvalid ? "danger" : formErrorsValidationExt === undefined ? "primary" : "success"
    return {isInvalid, errorMessage, color}
}
