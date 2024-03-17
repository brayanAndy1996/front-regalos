import { useState, useEffect } from 'react'

const useAutoCompleteNative = ({
  name,
  codeKey,
  onSelectionChange,
  codeLabel,
  searchComplete,
  optionsExt,
  valueExt
}: any): any => {
  const [value, setValue] = useState<any>('')
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<[]>([])
  const [isLoadingOptions, setIsLoadingOptions] = useState(false)

  const handleSetValue = (e: any): any => {
    if (!e) {
      setValue('')
      setInputValue('')
      if (!name) onSelectionChange('')
      else onSelectionChange({ target: { name, value: '' } })
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const dataSelected: any = options?.find((animal: any) => animal[codeKey]?.toLowerCase() === e?.toLowerCase()) ?? {}
    setValue(dataSelected[codeKey])
    setInputValue(dataSelected[codeLabel] as string)
    if (!name) onSelectionChange(dataSelected[codeKey])
    else onSelectionChange({ target: { name, value: dataSelected[codeKey] } })
  }

  const searchText = async (text: string): Promise<any> => {
    setInputValue(text)
    if (searchComplete) {
      try {
        setIsLoadingOptions(true)
        const data = await searchComplete(text)
        setOptions(data as [])
      } catch (error) {
        setOptions([])
      } finally {
        setIsLoadingOptions(false)
      }
    } else {
      const data: [] = optionsExt?.filter((option: any) =>
        option[codeLabel]?.toLowerCase().includes(text.toLowerCase())
      )
      setOptions(data)
    }
  }

  const setValueMatch = (opts: []): any => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const dataSelected: any = opts.find((animal: any) => animal[codeKey]?.toLowerCase() === value?.toLowerCase())
    if (!dataSelected) {
      setValue(valueExt)
      setInputValue(valueExt as string)
    } else {
      setValue(dataSelected[codeKey])
      setInputValue(dataSelected[codeLabel] as string)
    }
  }

  const setValueMatchSearch = async (val: string): Promise<void> => {
    try {
      setIsLoadingOptions(true)
      const data = await searchComplete(val)
      if (data.length > 0) {
        setValue(data[0][codeKey])
        setInputValue(data[0][codeLabel] as string)
      } else {
        setValue(val)
        setInputValue(val)
      }
    } catch (error) {
      setValue(val)
      setInputValue(val)
    } finally {
      setIsLoadingOptions(false)
    }
  }

  useEffect(() => {
    const val = valueExt || ''
    if (options.length > 0) setValueMatch(options)
    else if (optionsExt?.length > 0) setValueMatch(optionsExt as [])
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    else if (searchComplete) setValueMatchSearch(val as string)
    else {
      setValue(val)
      setInputValue(val as string)
    }
  }, [valueExt, codeKey, codeLabel, optionsExt])

  useEffect(() => {
    if (optionsExt?.length > 0) setOptions(optionsExt as [])
  }, [optionsExt])

  return {
    options,
    inputValue,
    value,
    handleSetValue,
    searchText,
    isLoadingOptions
  }
}

export default useAutoCompleteNative
