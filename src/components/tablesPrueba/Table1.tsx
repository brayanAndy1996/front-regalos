'use client'
import { User } from '@nextui-org/react'
import GeneralTable from '@/components/tableGeneral/GeneralTable'

const Table1 = (): JSX.Element => {
  const rows = [
    {
      id: 1,
      name: 'Tony Reichert',
      role: 'CEO',
      team: 'Management',
      status: 'active',
      age: '29',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      email: 'tony.reichert@example.com'
    },
    {
      id: 2,
      name: 'Zoey Lang',
      role: 'Technical Lead',
      team: 'Development',
      status: 'paused',
      age: '25',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      email: 'zoey.lang@example.com'
    },
    {
      id: 3,
      name: 'Jane Fisher',
      role: 'Senior Developer',
      team: 'Development',
      status: 'active',
      age: '22',
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
      email: 'jane.fisher@example.com'
    },
    {
      id: 4,
      name: 'William Howard',
      role: 'Community Manager',
      team: 'Marketing',
      status: 'vacation',
      age: '28',
      avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
      email: 'william.howard@example.com'
    },
    {
      id: 5,
      name: 'Kristen Copper',
      role: 'Sales Manager',
      team: 'Sales',
      status: 'active',
      age: '24',
      avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
      email: 'kristen.cooper@example.com'
    }
  ]

  const columns = [
    {
      key: 'name',
      label: 'Nombre',
      sortable: true
      // customComponent: 'userCustomComponent'
    },
    {
      key: 'age',
      label: 'Edad'
    }
  ]

  type User = typeof rows[0]

  interface UserCustom {
    user: User
    columnKey: React.Key
  }

  type Data = Record<string, any>

  const userCustomComponent = ({
    user,
    columnKey
  }: UserCustom): JSX.Element => {
    const cellValue = user[columnKey as keyof User]
    return (
      <User
        avatarProps={{ radius: 'lg', src: user.avatar }}
        description={user.email}
        name={cellValue}
      >
        {user.email}
      </User>
    )
  }

  const requestData = async ({
    setData,
    setTotalAllData,
    setIsLoading,
    page,
    limit
  }: any): Promise<any> => {
    setIsLoading(true)
    try {
      const totalAllDataResponse = await fetch('http://localhost:5000/users')
      const totalAllData = await totalAllDataResponse.json()
      setTotalAllData(totalAllData.length)

      const dataResponse = await fetch(
        `http://localhost:5000/users?_page=${page}&_limit=${limit}`
      )
      const data = await dataResponse.json()
      // Función que retorna una promesa que se resuelve después de 2 segundos
      const delay = (): any => new Promise(resolve => setTimeout(resolve, 2000))

      // Espera 2 segundos antes de realizar la solicitud
      await delay()
      setData(data)
    } catch (error) {
      setData([])
      setTotalAllData(0)
    } finally {
      setIsLoading(false)
    }
  }

  const getRows = (rows: Data[]): void => {
    console.log(rows)
  }

  return (
    <GeneralTable
      // data={rows}
      columns={columns}
      userCustomComponent={userCustomComponent}
      requestData={requestData}
      selectionMode='multiple'
      getRows={getRows}
    />
  )
}

export default Table1
