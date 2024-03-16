
import { useState, useEffect, useCallback, useMemo } from "react";
import { SortDescriptor } from '@nextui-org/react'
import { ObjectStringSimpleType as Data } from "@/helpers/types";
import usePagination from "@/hooks/usePagination";
import { deleteValuesEqualsOnArray, differenceBetweenArrays, intersectionBetweenArrays } from "@/helpers/transformArrays";

const useTableGeneral = (props:any) => {
    const [data, setData] = useState([] as Data[]);
    const [totalAllData, setTotalAllData] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState<string[]>([""]);
    const [dataSelected, setDataSelected] = useState<Data[]>([])
    const { page, pages, setPageOnChange, handleSelectionChange, rowsPerPage} = usePagination({totalAllData})
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({})
    const [trigger, setTrigger] = useState(false)
    type User = typeof data[0]

    const reload = () => setTrigger(!trigger)

    const fetchData = useCallback(async () => {
        if(props.requestData) props.requestData({ setData, setTotalAllData, setIsLoading, page:page, limit: rowsPerPage })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page, rowsPerPage, trigger])

    const handleSelectionChangeTable = (selection: any) =>  setSelectedKeys(selection)

    const handleSortDescriptorChange = (sortDescriptor: SortDescriptor) => {
      setSortDescriptor(sortDescriptor)
    }

    const sortedItems = useMemo(() => {
      return [...data].sort((a: User, b: User) => {
        const first = a[sortDescriptor.column as keyof User] 
        const second = b[sortDescriptor.column as keyof User]
        const cmp = first < second ? -1 : first > second ? 1 : 0
  
        return sortDescriptor.direction === 'descending' ? -cmp : cmp
      })
    }, [sortDescriptor, data])

    useEffect(() => {
        if(props.data) setData(props.data);
     }, [props.data])
 
    useEffect(() => {
        fetchData()
    }, [fetchData]);

    useEffect(() => {
      if(!props.getRows || !props.selectionMode) return
      props.getRows(dataSelected)
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSelected, props.getRows, props.selectionMode])
     
 
    useEffect(() => {
      // if(typeof selectedKeys === 'string' && selectedKeys === "all"){
      //   handleSelectionChange({target:{value: totalAllData}})
      //   return
      // }
      console.log(selectedKeys)
      console.log(data)
      console.log([...selectedKeys])
       const rowsSelected = data.filter((_, index) => [...selectedKeys].includes(String((index + 1)+ (rowsPerPage * (page - 1)))))
       console.log("🚀 ~ useEffect ~ rowsSelected:", rowsSelected)
       setDataSelected((oldData) =>{
        if(oldData.length > rowsSelected.length){
          const oldDataNoInRange = differenceBetweenArrays(oldData, data)
          const oldDataInRange = intersectionBetweenArrays(oldData, data)
          const rowsSelectedIntersectionOldDataInRange = intersectionBetweenArrays(rowsSelected, oldDataInRange)
          return deleteValuesEqualsOnArray([...rowsSelectedIntersectionOldDataInRange, ...oldDataNoInRange, ...rowsSelected])
        }
        return deleteValuesEqualsOnArray([...oldData, ...rowsSelected])
       })
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKeys, data]);
     
  return {
    selectedKeys,
    handleSelectionChangeTable,
    isLoading,
    sortedItems,
    page, 
    pages, 
    setPageOnChange, 
    handleSelectionChange,
    rowsPerPage,
    handleSortDescriptorChange,
    sortDescriptor,
    reload
  }
}

export default useTableGeneral