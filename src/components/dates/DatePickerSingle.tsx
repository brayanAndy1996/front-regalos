import { useState } from 'react'
import Datepicker from 'tailwind-datepicker-react'
import dayjs from 'dayjs'

interface Props {
  setDate: any
  value?: string
}

const options: any = {
  // title: "Seleccione una fecha",
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  clearBtnText: 'Borrar',
  todayBtnText: 'Hoy',
  // maxDate: new Date("2030-01-01"),
  // minDate: new Date("1950-01-01"),
  theme: {
    // background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: '!text-white '
    // clearBtn: "",
    // icons: "",
    // text: "",
    // // disabledText: "bg-red-500",
    // input: "",
    // inputIcon: "",
    // selected: "",
  },
  // icons: {
  // // () => ReactElement | JSX.Element
  // prev: () => <span>Previous</span>,
  // next: () => <span>Next</span>,
  // },
  datepickerClassNames: 'top-25',
  // defaultDate: new Date("2022-01-01"),
  language: 'es',
  disabledDates: [],
  weekDays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
  inputNameProp: 'date',
  inputIdProp: 'date',
  inputPlaceholderProp: 'Fecha',
  inputDateFormatProp: {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
}

const DatePickerSingle = ({ setDate, value }: Props): any => {
  const [show, setShow] = useState<boolean>(false)
  const handleChange = (selectedDate: Date): any => {
    const dateConvert = dayjs(new Date(selectedDate)).format('YYYY-MM-DD')
    setDate(dateConvert)
  }

  const handleClose = (state: boolean): any => {
    setShow(state)
  }

  return (
    <div className='w-60'>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  )
}

export default DatePickerSingle
