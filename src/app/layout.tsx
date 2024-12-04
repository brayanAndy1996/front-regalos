import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import StoreProvider from './StoreProvider'
import { ToastContainer } from 'react-toastify'
import NavBarRegalos from '@/components/nav/NavBarRegalos'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className="">
          {
            <Providers>
              <StoreProvider>
                <div className='flex flex-row'>
                  <ToastContainer />
                  <div className='basis-full'>
                  <NavBarRegalos/>
                    {children}
                  </div>
                </div>

              </StoreProvider>
            </Providers>
          }
        </main>
      </body>
    </html>
  )
}
