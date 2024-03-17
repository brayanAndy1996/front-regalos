'use client'
import { useState } from 'react'
import DatePickerRange from '@/components/dates/DatePickerRange'
import DatePickerSingle from '@/components/dates/DatePickerSingle'
// import AutoCompleteComponent from '@/components/input/AutoComplete'

const DatePickerPage = (): JSX.Element => {
  const [datesDataPicker, setDatesDataPicker] = useState({})
  const [dateDataSimple, setDateDataSimple] = useState({})
  console.log(
    '🚀 ~ file: page.tsx:10 ~ DatePickerPage ~ dateDataSimple:',
    dateDataSimple
  )
  return (
    <div>
      <div className='flex'>
        <DatePickerSingle setDate={setDateDataSimple} />
        <DatePickerRange
          value={datesDataPicker}
          setValue={setDatesDataPicker}
          showFooter
        />
      </div>
    </div>
  )
}

export default DatePickerPage
