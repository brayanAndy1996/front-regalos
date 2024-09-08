'use client'

import React from 'react'
import { useAppContext } from '@/context'
const Page = (): JSX.Element => {
  const { token } = useAppContext()
  console.log("🚀 ~ Page ~ token:", token)
  return (
    <div>page</div>
  )
}

export default Page
