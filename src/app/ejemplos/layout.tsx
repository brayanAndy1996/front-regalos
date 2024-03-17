'use client'
import { usePathname } from 'next/navigation'
import { Tabs, Tab } from '@nextui-org/react'

const layout = ({ children }: any): JSX.Element => {
  const pathname = usePathname()
  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label='Options' selectedKey={pathname}>
        <Tab key='table' title='table' href='/ejemplos/table'></Tab>
        <Tab key='modal' title='Modal' href='/ejemplos/modal'></Tab>
        <Tab key='chart' title='Chart' href='/ejemplos/chart'></Tab>
        <Tab key='input' title='Inputs' href='/ejemplos/inputs'></Tab>
      </Tabs>
      {children}
    </div>
  )
}

export default layout
