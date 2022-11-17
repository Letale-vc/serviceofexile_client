import React, { ChangeEvent, FC, KeyboardEvent } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { matchSorter } from 'match-sorter'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Paper,
  Box,
  Autocomplete,
  TextField,
  MenuItem,
  Typography,
  Button,
  Switch
} from '@mui/material'
import { Service } from '../../../../server/service/service.entity'
import { ServiceName } from '../../../../server/data/serviceNames/serviceName.entity'
import { ServiceUpdateRequest } from '../../../../common-interface/services/services-update'

import { useTypeDispatch, useTypeSelector } from '../../../redux/hooks'
import {
  deleteServiceThunk,
  updateServiceThunk
} from '../../../redux/reducers/profileSlice'

export interface PropsType {
  service: Service
  index: number
  optionsList: ServiceName[]
}

const UpdateServiceForm: FC<PropsType> = ({ service, optionsList }) => {
  const [activeChecked, setActive] = React.useState(service.active)
  const [inputValues, setInputValue] = React.useState('')
  const dispatch = useTypeDispatch()
  const { currency } = useTypeSelector((state) => state.data.data)
  const updateList = (dataServiceUpdate: ServiceUpdateRequest): void => {
    void dispatch(updateServiceThunk(dataServiceUpdate))
  }
  const deleteList = (): void => {
    void dispatch(deleteServiceThunk({ uuid: service.uuid }))
  }

  const validationSchema = Yup.object().shape({
    currency: Yup.string().required(),
    price: Yup.number().required().positive('Must be positive').max(9999),
    bulk: Yup.number().required().positive('Must be positive').max(99).integer()
  })

  const optionInitial = optionsList.find(
    (el) => el.id === service.serviceName.id
  )

  const initialValues = () => ({
    serviceName: {
      firstWord: optionInitial?.name.split(' ')[0],
      option: optionInitial
    },

    currencyId: service.currency.id,
    price: service.price,
    bulk: service.bulk
  })

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema,
    onSubmit: (values, actions) => {
      updateList({
        serviceNameId: values.serviceName.option.id,
        price: values.price,
        active: activeChecked,
        bulk: values.bulk,
        currencyId: values.currencyId,
        uuid: service.uuid,
        leagueId: service.league.id,
        sellOrBuy: service.sellOrBuy
      })

      actions.resetForm({ values })
    }
  })

  const ifChangeOrIfTouched = () => {
    if (
      service.serviceName.id === formik.values.serviceName?.option?.id &&
      service.currency.id === formik.values.currencyId &&
      service.price === formik.values.price
    ) {
      return true
    }
    return false
  }

  const handleChangeChecked = (event: ChangeEvent<HTMLInputElement>): void => {
    setActive(event.target.checked)
    updateList({
      serviceNameId: formik.values.serviceName.option.id,
      price: formik.values.price,
      bulk: formik.values.bulk,
      currencyId: formik.values.currencyId,
      active: event.target.checked,
      uuid: service.uuid,
      leagueId: service.league.id,
      sellOrBuy: service.sellOrBuy
    })
  }

  const filterOptions = (
    options: {
      firstWord: string
      option: ServiceName | undefined
    }[],
    {
      inputValue
    }: {
      inputValue: string
    }
  ) => matchSorter(options, inputValue, { keys: ['firstWord', 'option'] })

  const blockInvalidChar = (e: KeyboardEvent<HTMLInputElement>) =>
    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()

  const label = () =>
    `${
      service.serviceName.serviceCategory.name.charAt(0).toUpperCase() +
      service.serviceName.serviceCategory.name.slice(1)
    }`

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper sx={{ display: 'flex', alignItems: 'center', p: 2, mt: 1 }}>
        <Box
          sx={{ float: 'left' }}
          pt={3.5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexBasis="max-content"
        >
          <Box display="flex">
            <Box mr={1} width={500}>
              <Autocomplete
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
                value={formik.values.serviceName}
                inputValue={inputValues}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue)
                }}
                onChange={(e, value) =>
                  formik.setFieldValue('serviceName', value)
                }
                id="search-serviceName"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="serviceName"
                    label={label()}
                    type="text"
                    error={
                      formik.touched.serviceName &&
                      Boolean(formik.errors.serviceName)
                    }
                    // helperText={
                    //   formik.touched.serviceName && formik.errors.serviceName
                    // }
                  />
                )}
              />
            </Box>
            <Box mr={1} width={160}>
              <TextField
                select
                fullWidth
                label="Price currency"
                name="currency"
                id="currency"
                onChange={formik.handleChange}
                value={formik.values.currencyId}
                error={
                  formik.touched.currencyId && Boolean(formik.errors.currencyId)
                }
                helperText={
                  formik.touched.currencyId && formik.errors.currencyId
                }
              >
                {currency.map((e) => (
                  <MenuItem key={`${e.id}`} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box mr={1} width={100}>
              <TextField
                fullWidth
                onKeyDown={blockInvalidChar}
                type="number"
                name="price"
                label="Price"
                id={`price_${service.uuid}`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  formik.setFieldValue(
                    'price',
                    event.currentTarget.value.toString().length <= 4
                      ? event.currentTarget.value
                      : formik.values.price
                  )
                }
                value={formik.values.price}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Box>
            <Box width={75} mr={1}>
              <TextField
                fullWidth
                onKeyDown={blockInvalidChar}
                type="number"
                name="bulk"
                label="Bulk"
                id={`update_bulk_${service.uuid}`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  formik.setFieldValue(
                    'bulk',
                    event.currentTarget.value.toString().length <= 2
                      ? event.currentTarget.value
                      : formik.values.bulk
                  )
                }
                value={formik.values.bulk}
                error={formik.touched.bulk && Boolean(formik.errors.bulk)}
                helperText={formik.touched.bulk && formik.errors.bulk}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            padding: 1,
            textAlign: 'center'
          }}
        >
          <Typography variant="body2">Show your service</Typography>
          <Switch
            color="primary"
            checked={activeChecked}
            onChange={handleChangeChecked}
            name="active"
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Button
            sx={{ margin: 0.5, width: '85px' }}
            color="primary"
            variant="contained"
            type="submit"
            disabled={
              ifChangeOrIfTouched() && !(formik.isValid && formik.dirty)
            }
            startIcon={<SaveAltIcon />}
          >
            save
          </Button>
          <Button
            sx={{ margin: 0.5, width: '85px' }}
            type="button"
            onClick={deleteList}
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      </Paper>
    </form>
  )
}

export default UpdateServiceForm
