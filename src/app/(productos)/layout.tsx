import Filter from "./filters/Filter"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <div>
      <div className='flex justify-start relative'>
        <Filter/>
        <div className='basis-4/5'>
          {children}
        </div>
      </div>
    </div>
  )
}