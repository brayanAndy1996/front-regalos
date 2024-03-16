import { trasnformToSimpleDate } from './transformDates'

export const deleteValuesEqualsOnArray = (array: any[]): any[] => {
  const arrayTransformObjectsOnString = new Set(
    array.map(arr => JSON.stringify(arr))
  )
  return Array.from(arrayTransformObjectsOnString).map(arr => JSON.parse(arr))
}

export const differenceBetweenArrays = (
  array1: any[],
  array2: any[]
): any[] => {
  const arrayTransformObjectsOnString1: any = new Set(
    array1.map(arr => JSON.stringify(arr))
  )
  const arrayTransformObjectsOnString2 = new Set(
    array2.map(arr => JSON.stringify(arr))
  )
  const difference = new Set(
    [...arrayTransformObjectsOnString1].filter(
      x => !arrayTransformObjectsOnString2.has(x)
    )
  )
  return Array.from(difference).map(arr => JSON.parse(arr))
}

export const intersectionBetweenArrays = (
  array1: any[],
  array2: any[]
): any[] => {
  const arrayTransformObjectsOnString1: any = new Set(
    array1.map(arr => JSON.stringify(arr))
  )
  const arrayTransformObjectsOnString2 = new Set(
    array2.map(arr => JSON.stringify(arr))
  )
  const intersection = new Set(
    [...arrayTransformObjectsOnString1].filter(x =>
      arrayTransformObjectsOnString2.has(x)
    )
  )
  return Array.from(intersection).map(arr => JSON.parse(arr))
}

export const getSumTotalOfAField = (array: any[], field: string): number => {
  return array
    .filter(data => data[field])
    .reduce((acc, cur) => acc + parseFloat(cur[field]), 0)
}

export const getSumTotalOfAProductTwoField = (array: any[], field: string, field2: string): number => {
  return array
    .filter(data => data[field] && data[field2])
    .reduce((acc, cur) => acc + parseFloat(cur[field]) * parseFloat(cur[field2]), 0)
}

interface transformToDataFormatGraphicType {
  array: any[]
  fieldDate: string
  fieldValue: string
}
export const transformToDataFormatGraphic = ({
  array,
  fieldDate,
  fieldValue
}: transformToDataFormatGraphicType): Array<{
  time: string
  value: number
}> => {
  // transformToSimpleDate
  return array
    .reduce((acc, cur) => {
      const time = trasnformToSimpleDate(cur[fieldDate])
      const value = parseFloat(cur[fieldValue])

      const existingIndex = acc.findIndex((data: any) => data.time === time)

      if (existingIndex === -1) {
        return [...acc, { time, value }]
      }

      acc[existingIndex].value += value
      return acc
    }, [])
    .sort((a: any, b: any) => {
      if (a.time < b.time) return -1
      if (a.time > b.time) return 1
      return 0
    })
}

export const reduceToANonRepeteadValue = (array: any[], keyObject: string): any[] => {
  return array.reduce((acc, cur) => {
    const existingIndex = acc.findIndex((data: any) => data === cur[keyObject])
    if (existingIndex === -1) {
      return [...acc, cur[keyObject]]
    }
    return acc
  }, [])
} 

export const reduceToANonRepeteadObject = (array: any[], keyObject: string): any[] => {
  return array.reduce((acc, cur) => {
    const existingIndex = acc.findIndex((data: any) => data[keyObject] === cur[keyObject])
    if (existingIndex === -1) {
      return [...acc, cur]
    }
    return acc
  }, [])
} 
