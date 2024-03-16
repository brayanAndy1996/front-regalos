import Datepicker from 'react-tailwindcss-datepicker'

interface DatePickerRangeProps {
  value: any
  setValue: any
  placeholder?: string
  showFooter?: boolean
  name?: string
}

const DatePickerRange = ({
  value,
  setValue,
  placeholder = 'Selecciona un rango de fechas',
  showFooter,
  name
}: DatePickerRangeProps): any => {
  const handleValueChange = (newValue: any): any => {
    if (name) {
      setValue({ target: { name, value: newValue } })
      return
    }
    setValue(newValue)
  }

  return (
    <div className='w-64'>
      <Datepicker
        // inputClassName="border border-indigo-300 p-1 text-white"
        placeholder={placeholder}
        i18n={'es'}
        value={value}
        onChange={handleValueChange}
        showShortcuts={true}
        showFooter={showFooter}
        configs={{
          shortcuts: {
            today: 'Hoy',
            yesterday: 'Ayer',
            past: period => `Últimos ${period} días`,
            currentMonth: 'Mes actual',
            pastMonth: 'Mes anterior'
          },
          footer: {
            cancel: 'Cancelar',
            apply: 'Ok'
          }
        }}
      />
    </div>
  )
}

export default DatePickerRange
