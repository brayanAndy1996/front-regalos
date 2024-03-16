import { Button } from '@nextui-org/react'
import { useState } from 'react'
import fileSaver from 'file-saver'
import ExcelJS from 'exceljs'
import {
  trasnformToSimpleDate,
  trasnformToSimpleDateTime
} from '@/helpers/transformDates'

const alfabetoExcel = [
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'AA',
  'AB',
  'AC',
  'AD',
  'AE'
]

const optionsCellFormat = {
  text: (value: string) => value,
  dateHour: (value: string) => trasnformToSimpleDateTime(value),
  date: (value: string) => trasnformToSimpleDate(value),
  price: (value: string) => `s/ ${parseFloat(value).toFixed(2)}`
}

export const ButtonExcel = ({
  columnsConfig = [],
  dataToExcel,
  requestData,
  title = '',
  horizontalAligment = 'middle',
  nameDocument = 'xlx'
}: any): JSX.Element => {
  const [excelIsLoading, setExcelIsLoading] = useState(false)

  const mergePlace = `'B7:${alfabetoExcel[columnsConfig.length - 1]}7'`
  const getInfo = async (): Promise<any> => {
    setExcelIsLoading(true)
    try {
      let clientesNuevos
      if (requestData) clientesNuevos = await requestData()
      else clientesNuevos = dataToExcel
      // Se requiere pasar los valores en un array de arrays
      const values = clientesNuevos.map((cliente: any) => {
        const docValues: any[] = []
        columnsConfig.forEach((column: any) => {
          const dataFormat: string = column.dataFormat ?? 'text'
          const value = optionsCellFormat[
            dataFormat as keyof typeof optionsCellFormat
          ](cliente[column.key])
          docValues.push(value)
        })
        return docValues
      })
      // Se crea una instancia de un excel
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Hoja 1', {
        views: [{ showGridLines: false }]
      })

      // Titulo del reporte
      worksheet.mergeCells(mergePlace) // merge a range of cells
      worksheet.getCell('B7').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '21518B' }
      }

      worksheet.getCell('B7').alignment = {
        vertical: 'middle',
        horizontal: horizontalAligment
      }
      worksheet.getCell('B7').value = {
        richText: [
          {
            font: {
              color: { argb: 'F2F2F2' },
              bold: true,
              size: 12,
              name: 'Arial'
            },
            text: title
          }
        ]
      }
      columnsConfig.forEach((column: any, index: any) => {
        worksheet.getColumn(alfabetoExcel[index]).width = parseInt(column.width)
      })
      const columnsTable = columnsConfig.map((column: any) => {
        return {
          name: column.label,
          filterButton: false
        }
      })
      worksheet.addTable({
        name: 'MyTable',
        ref: 'B8',
        style: { theme: 'TableStyleLight20', showRowStripes: true },
        columns: columnsTable,
        rows: values
      })

      // Descarga del excel
      workbook.xlsx
        .writeBuffer()
        .then(buffer => {
          fileSaver.saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            `${nameDocument}.xlsx`
          )
        })
        .catch(err => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    } finally {
      setExcelIsLoading(false)
    }
  }

  return (
    <div className='text-start mt-3'>
      {/* <Button
        label='Excel'
        loading={excelIsLoading}
        icon='pi pi-file-pdf'
        className='p-button-success'
        onClick={_ => getInfo('excel')}
      /> */}
      <Button
        isLoading={excelIsLoading}
        onClick={_ => {
          getInfo().catch(err => {
            console.log(err)
          })
        }}
      >
        Excel
      </Button>
    </div>
  )
}
