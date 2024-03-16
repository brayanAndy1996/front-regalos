import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { AutocompleteProps } from '@/helpers/types';
import { errorsValidation } from '@/helpers/validation';
import useAutoCompleteNative from '@/hooks/useAutoComplete';

type PropsItem = {
  [key: string]: any
}

const AutoCompleteComponent = (props:AutocompleteProps) => {

    const { errorMessage, isInvalid, color } = errorsValidation({ formErrorsValidationExt:props.formErrorsValidation, name:props.name || ''  })
    
    const { 
      options,
      inputValue,
      value,
      handleSetValue,
      searchText,
      isLoadingOptions
    } = useAutoCompleteNative({ 
      name:props.name, 
      codeKey:props.codeKey, 
      onSelectionChange:props.onSelectionChange, 
      codeLabel:props.codeLabel, 
      searchComplete:props.searchComplete,
      optionsExt:props.options,
      valueExt:props.value
    })  

  return (
    <div>
         <Autocomplete
            {...props}
            classNames={{
              base: 'max-w-xs',
              listboxWrapper: 'max-h-[320px] bg-zinc-900 text-white',
              selectorButton: 'text-default-500',
              popoverContent: 'bg-zinc-900'
            }}
            variant='bordered'
            label={props.label || ''}
            className="max-w-xs"
            errorMessage={ errorMessage}
            isInvalid={isInvalid}
            color={color}
            items={options}
            inputValue={inputValue}
            selectedKey={value}
            onSelectionChange={handleSetValue}
            onInputChange={searchText}
            isLoading={isLoadingOptions}
            size={props.size || 'sm'}

          >
            {(item:PropsItem) => (
                <AutocompleteItem key={item[props.codeKey]} className="capitalize">
                {item[props.codeLabel]}
                </AutocompleteItem>
            )}
          </Autocomplete>

    </div>
  )
}

export default AutoCompleteComponent