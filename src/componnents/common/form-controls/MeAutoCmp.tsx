import React from 'react'
import { matchSorter } from 'match-sorter'
import { FC, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { ServiceName } from '../../../../server/data/serviceNames/serviceName.entity'

interface PropsType {
  optionsList: ServiceName[]
  serviceNameLabel: string
  value:
    | string
    | {
        option: ServiceName
        firstWord: string
      }
  error: boolean | undefined
  helperText: string
  onChange: (
    e: React.SyntheticEvent<Element, Event>,

    value:
      | string
      | { option: ServiceName | undefined; firstWord: string }
      | null
  ) => void
}

export const MeAutoCmp: FC<PropsType> = ({
  optionsList,
  serviceNameLabel,
  value,
  onChange,
  error,
  helperText
}) => {
  const [inputValues, setInputValue] = useState('')
  const label = () =>
    `${serviceNameLabel.charAt(0).toUpperCase() + serviceNameLabel.slice(1)}`
  const filterOptions = (
    options: {
      option: ServiceName | undefined
      firstWord: string
    }[],
    {
      inputValue
    }: {
      inputValue: string
    }
  ) => matchSorter(options, inputValue, { keys: ['firstWord', 'option'] })
  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      options={optionsList
        .map((option) => {
          const firstWord = option.name.split(' ')[0]
          return {
            firstWord,
            option
          }
        })
        .sort((a, b) => -b.firstWord.localeCompare(a.firstWord))}
      getOptionLabel={(option) => option.option?.name || ''}
      filterOptions={filterOptions}
      groupBy={(option) => option.firstWord}
      fullWidth
      inputValue={inputValues}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      // id="search-serviceName"
      renderInput={(params) => (
        <TextField
          {...params}
          name="serviceName"
          label={label()}
          type="text"
          error={error}
          helperText={helperText}
        />
      )}
    />
  )
}

export default MeAutoCmp
