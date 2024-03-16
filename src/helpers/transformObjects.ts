export const deleteFalsys = (valueObject: object): object => {
  return Object.entries(valueObject).reduce((acc, curr) => {
    if (curr[1]) return { ...acc, [curr[0]]: curr[1] }
    return acc
  }, {})
}
