'use client'
import { usePathname } from 'next/navigation'
import { Tabs, Tab } from '@nextui-org/react'

const Navbar = (): JSX.Element => {
  const pathname = usePathname()
  return (
      <Tabs
        aria-label='Options'
        selectedKey={pathname}
        classNames={{
          tabList: 'gap-6 relative rounded-none p-0 border-b border-divider flex flex-col h-screen w-full',
          cursor: 'w-full bg-[#22d3ee]',
          tab: 'max-w-fit px-0 h-12',
          tabContent: 'group-data-[selected=true]:text-[#06b6d4] flex items-center justify-start my-1 p-3 text-white w-full'
        }}
      >
        <Tab key='ejemplos' title='Ejemplos' href='/ejemplos/table'></Tab>
        <Tab key='reportes' title='Reportes' href='/reportes'></Tab>
      </Tabs>
  )
}

export default Navbar
