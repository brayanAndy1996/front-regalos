import dayjs from 'dayjs'

export const trasnformToSimpleDate = (date: string): string => {
  if (!date) return ''
  const fecha = dayjs(date)
  return fecha.format('YYYY-MM-DD')
}

export const trasnformToSimpleDateTime = (date: string): string => {
  if (!date) return ''
  const fecha = dayjs(date)
  return fecha.format('YYYY-MM-DD HH:mm:ss')
}

export const trasnformToSimpleTime = (date: string): string => {
  if (!date) return ''
  const fecha = dayjs(date)
  return fecha.format('HH:mm:ss')
}
