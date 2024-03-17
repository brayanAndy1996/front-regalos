import { Input, Textarea } from '@nextui-org/react'
import { type InputProps } from '@/helpers/types'
import { errorsValidation } from '@/helpers/validation'

const InputComponent = (props: InputProps): JSX.Element => {
  const { errorMessage, isInvalid, color } = errorsValidation({ formErrorsValidationExt: props.formErrorsValidation, name: props.name ?? '' })
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const onClear = (): any => props.name ? props.onChange({ target: { name: props.name, value: '' } } as React.ChangeEvent<HTMLInputElement>) : props.onChange('')
  const handleOnChange = props.name ? props.onChange : (e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)

  return (
    <div className='max-w-xs'>
      {
        props.type === 'textarea' 
          ? (
            <Textarea
              {...props}
              variant='bordered' 
              size={props.size ?? 'sm'}
              isInvalid={props.isInvalid ?? isInvalid}
              errorMessage={ props.errorMessage ?? errorMessage}
              color={props.color ?? color}
              onClear={onClear}
              onChange={handleOnChange}
            />
            ) 
          : (
              <Input 
                {...props}
                variant='bordered' 
                size={props.size ?? 'sm'}
                isInvalid={props.isInvalid ?? isInvalid}
                errorMessage={ props.errorMessage ?? errorMessage}
                color={props.color ?? color}
                onClear={onClear}
                min={ props.type === 'number' ? props.min : ''}
                max = { props.type === 'number' ? props.max : ''}
                placeholder={props.type === 'date' ? 'YYYY-MM-DD' : props.placeholder}
                onChange={handleOnChange}
                // name={props.name}
                // label={props.label}
                // placeholder={props.placeholder}
                // isReadOnly={props.isReadOnly}
                // isRequired={props.isRequired}
                // isDisabled={props.isDisabled}
                // description={props.description}
                // defaultValue={props.defaultValue}
                // onChange={props.onChange}
                // startContent={props.startContent}
                // endContent={props.endContent}
                // type={props.type}
                // isClearable={props.isClearable}
                // value={props.value}
              />
            )
      }
    </div>
  )
}

export default InputComponent
