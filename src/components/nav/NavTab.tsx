'use client'

import { useState } from "react"
import { usePathname } from 'next/navigation'
import {Tabs, Tab, Chip} from "@nextui-org/react"
import { PelucheIcon } from "@/icons/Peluche"
import { ChocolateIcon } from "@/icons/Chocolate"
import { JoyaIcon } from "@/icons/Joya"

const NavTab = () => {
    const pathname = usePathname()
    const iconos = {
      'PelucheIcon': <PelucheIcon/>
    }
    return (
        <div className="flex flex-col px-8">
          <Tabs 
            aria-label="Options" 
            color="primary" 
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-[#22d3ee]",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-[#06b6d4]"
            }}
            selectedKey={pathname}
          >
            <Tab
              key="peluches"
              href='/peluches'
              title={
                <div className="flex items-center space-x-2">
                  {iconos.PelucheIcon}
                  <span>Peluches</span>
                  <Chip size="sm" variant="faded">11</Chip>
                </div>
              }
            />
            <Tab
              key="chocolates"
              href='/chocolates'
              title={
                <div className="flex items-center space-x-2">
                  <ChocolateIcon/>
                  <span>Chocolates</span>
                  <Chip size="sm" variant="faded">2</Chip>
                </div>
              }
            />
            <Tab
              key="joyas"
              href='/joyas'
              title={
                <div className="flex items-center space-x-2">
                  <JoyaIcon/>
                  <span>Joyas</span>
                  <Chip size="sm" variant="faded">0</Chip>
                </div>
              }
            />
          </Tabs>
        </div>  
      );
}

export default NavTab