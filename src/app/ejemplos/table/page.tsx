import GeneralTable2 from '@/components/tableGeneral/GeneralTable2'
import Table1 from '@/components/tablesPrueba/Table1'
import TablaPrueba from './components/TablePrueba'
const PageTable = (): JSX.Element => {
  return (
    <div>
      <Table1 />
      <GeneralTable2 />
      <div className='mt-5'>
        <TablaPrueba/>
      </div>
    </div>
  )
}

export default PageTable
