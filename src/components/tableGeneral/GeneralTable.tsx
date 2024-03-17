'use client'

import { type Key, useMemo } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Select,
  SelectItem,
  Spinner
} from '@nextui-org/react'
import { type TableProps } from '@/helpers/types'
import useTableGeneral from './hooks/useTableGeneral'
import { trasnformToSimpleDate, trasnformToSimpleDateTime } from '@/helpers/transformDates'

const emptyContent = (
  <div className='flex justify-center items-center h-40 text-2xl text-default-500'>
    No hay datos
  </div>
)

const loadingContent = (
  <div className='flex justify-center items-center w-full h-full text-2xl text-default-500 backdrop-blur-sm'>
    <Spinner
      label='Cargando...'
      color='primary'
      labelColor='primary'
      size='lg'
    />
  </div>
)

export default function App (props: TableProps): JSX.Element {
  const {
    selectedKeys,
    handleSelectionChangeTable,
    isLoading,
    sortedItems: data,
    page,
    pages,
    setPageOnChange,
    handleSelectionChange,
    rowsPerPage,
    handleSortDescriptorChange,
    sortDescriptor,
    reload
  } = useTableGeneral(props)

  const optionsCellFormat = {
    text: (value: string) => value,
    dateHour: (value: string) => trasnformToSimpleDateTime(value),
    date: (value: string) => trasnformToSimpleDate(value),
    price: (value: string) => `s/ ${parseFloat(value).toFixed(2)}`
  }

  const handleTypeFormat = (value: string, cell: any): string => {
    const dataFormat: string = cell.dataFormat ?? 'text'
    return optionsCellFormat[dataFormat as keyof typeof optionsCellFormat](value)
  }

  const renderCell = (item: any, columnKey: React.Key): JSX.Element => {
    const cell = props.columns.find(column => column.key === columnKey)
    return cell?.customComponent
      ? props[cell.customComponent]({ dataRow: item, columnKey })
      : handleTypeFormat(getKeyValue(item, columnKey) as string, cell)
  }

  const bottomContent = useMemo(() => {
    return (
      pages > 0 && (
        <div className='w-3/5 mx-auto flex justify-between items-center py-2 px-2'>
          <div className='w-20'></div>
          <Pagination
            isCompact
            showControls
            showShadow
            color='primary'
            page={page}
            total={pages}
            onChange={setPageOnChange}
          />
          <Select
            size='sm'
            label='rows'
            color='primary'
            className='w-20'
            selectedKeys={[rowsPerPage.toString()]}
            onChange={handleSelectionChange}
          >
            {['5', '10', '25', '50', '100'].map(number => (
              <SelectItem key={number} value={number}>
                {number}
              </SelectItem>
            ))}
          </Select>
        </div>
      )
    )
  }, [pages, page])

  const topContent = useMemo((): JSX.Element => {
    if (typeof props.topContent === 'function') {
      const header = props.topContent({ data, reload })
      return <>{header}</>
    } 
    return <>{props.topContent}</> 
  }, [props.topContent])

  const classNames = useMemo(
    () => {
      if (props.themeDarkOne) {
        return {
          wrapper: ['bg-black'],
          th: ['border-[#292f46] bg-[#19172c] dark:bg-[#19172c]', 'font-black', 'text-white'],
          td: ['text-slate-400', 'font-light']
        }
      }
      return {}
    },
    []
  )

  return (
    <Table
      aria-label='Example table with custom cells'
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      topContent={topContent}
      topContentPlacement='outside'
      selectionMode={props.selectionMode}
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChangeTable}
      sortDescriptor={sortDescriptor}
      onSortChange={handleSortDescriptorChange}
      classNames={classNames}
    >
      <TableHeader columns={props.columns}>
        {column => <TableColumn key={column.key ?? '1'} allowsSorting={column.sortable} >{column.label}</TableColumn>}
      </TableHeader>

      <TableBody
        items={data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={loadingContent}
      >
        {(item: Record<string, unknown>) => {
          const uniqueKey: Key = Object.values(item).reduce((acc, value) => String(acc) + String(value), '') as Key
          return (
            <TableRow key={uniqueKey}>
              {columnKey => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )
        }}
      </TableBody>
    </Table>
  )
}
