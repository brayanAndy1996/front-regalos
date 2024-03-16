import { Card } from '@nextui-org/react'
import { Barlow } from 'next/font/google'

const inter = Barlow({ weight: '400', subsets: ['latin'] })

interface PropsCard {
  subtitle: string
  value?: string | number
  cardClassName?: string
}
const HeaderCard = ({ subtitle, value, cardClassName = '' }: PropsCard): JSX.Element => {
  return (
    <Card className={`${inter.className} ${cardClassName}`}>
      <div className='flex flex-col py-5 text-center'>
        <p className='text-xl font-black'>{ value }</p>
        <p className='text-xs font-thin capitalize'>{ subtitle }</p>
      </div>
    </Card>
  )
}

export default HeaderCard
