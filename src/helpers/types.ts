import { type SlotsToClasses } from '@nextui-org/react'

export type FormValidationsType = Record<
string,
[(value: any) => boolean, string]
>

export type ObjectStringSimpleType = Record<string, string>

export type ColorFormType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'

export interface BaseProps {
  label?: string
  value: any
  name?: string
  description?: string
  isRequired?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  formErrorsValidation?: Record<string, string | null>
  errorMessage?: string
  color?: any
  isInvalid?: boolean
  size?: 'sm' | 'md' | 'lg'
  labelPlacement?: 'inside' | 'outside' | 'outside-left'
  variant?: 'flat' | 'bordered' | 'underlined' | 'faded'
}

export type InputProps = BaseProps & {
  onChange: (event: React.ChangeEvent<HTMLInputElement> | string) => any
  defaultValue?: string
  placeholder?: string
  isClearable?: boolean
  onClear?: () => void
  type?: string
  min?: number
  max?: number
  maxRows?: number
  minRows?: number
  classNameComponent?: string
  onBlur?: () => any
  classNames?: SlotsToClasses<
  | 'base'
  | 'input'
  | 'label'
  | 'errorMessage'
  | 'description'
  | 'mainWrapper'
  | 'inputWrapper'
  | 'innerWrapper'
  | 'clearButton'
  | 'helperWrapper'
  >
}

export type AutocompleteProps = BaseProps & {
  options?: any
  searchComplete?: any
  codeKey: string
  codeLabel: string
  onSelectionChange: (value: any) => void
} & ({ options: any } | { searchComplete: any })

// Para el table component
interface ColumnsTable {
  key: string
  label?: string
  customComponent?: string
  sortable?: boolean
  width?: string
  dataFormat?: string
}

export interface TableProps {
  data?: ObjectStringSimpleType[]
  columns: ColumnsTable[]
  requestData?: (Props: any) => Promise<any>
  getRows?: (rows: ObjectStringSimpleType[]) => void
  selectionMode?: 'single' | 'multiple'
  topContent?: (values: object) => JSX.Element | React.ReactNode
  [key: string]: any
}
