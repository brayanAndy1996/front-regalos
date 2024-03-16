import { CalendarIcon } from '@/icons/CalendarIcon'
import { HourIcon } from '@/icons/HourIcon'
import {
  trasnformToSimpleTime,
  trasnformToSimpleDate
} from '@/helpers/transformDates'

export const DateTimeCustomComponent = ({ data, character }: any): JSX.Element => {
  return (
    <div className='m-2'>
      <div className='flex'>
        <CalendarIcon />
        <span className='ml-2'>{trasnformToSimpleDate(data[character])}</span>
      </div>
      <div className='flex'>
        <HourIcon />
        <span className='ml-2'>{trasnformToSimpleTime(data[character])}</span>
      </div>
    </div>
  )
}
