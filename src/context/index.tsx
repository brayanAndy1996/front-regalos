'use client'

import { createContext, useContext, useState } from 'react'

type SessionDatesType = {
    token: string
}

const defaultSession: SessionDatesType = {
    token : 'hhh'
}

const AppContext = createContext<any>(defaultSession)

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [sessionDates, setSessionDates] = useState(defaultSession)
    return <AppContext.Provider value={{sessionDates, setSessionDates}}>{children}</AppContext.Provider>
}

export function useAppContext() {
    return useContext(AppContext)
}