'use client'

import { NextUIProvider } from '@nextui-org/react'

export function Providers ({ children }: { children: React.ReactNode }): any {
  return <NextUIProvider>{children}</NextUIProvider>
}
