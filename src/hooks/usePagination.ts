import { useState, useMemo } from 'react'

const usePagination = ({ totalAllData }: any): any => {
  const [page, setPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const pages = useMemo(() => {
    return totalAllData > 0 ? Math.ceil(totalAllData / rowsPerPage) : 0
  }, [totalAllData, rowsPerPage])

  const setPageOnChange = (page: number): void => {
    setPage(page)
  }

  const handleSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setRowsPerPage(Number(e.target.value))
  }

  return {
    page,
    pages,
    rowsPerPage,
    setPageOnChange,
    handleSelectionChange
  }
}

export default usePagination
