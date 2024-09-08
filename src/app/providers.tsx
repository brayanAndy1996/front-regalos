'use client'

import { NextUIProvider } from '@nextui-org/react'
import { AppWrapper } from '@/context'

export function Providers ({ children }: { children: React.ReactNode }): any {
  return <NextUIProvider>
      <AppWrapper>
        {children}
      </AppWrapper>
    </NextUIProvider>
}
