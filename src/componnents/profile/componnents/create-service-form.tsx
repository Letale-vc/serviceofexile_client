import React, { FC, KeyboardEvent } from 'react'
import AddIcon from '@mui/icons-material//Add'
import * as Yup from 'yup'
import { MeAutoCmp } from '../../common/form-controls/MeAutoCmp'
import { Box, TextField, MenuItem, Button } from '@mui/material'
import { useFormik } from 'formik'
import { ServiceName } from '../../../../server/data/serviceNames/serviceName.entity'
import { Data } from '../../../../server/data/data.entity'
import { createServiceThunk } from '../../../redux/reducers/profileSlice'
import { useTypeDispatch } from '../../../redux/hooks'

interface PropsType {
  leagueId: number
  data: Data
  serviceNameLabel: string
  optionsList: ServiceName[]
  sellOrBuy: string
}

const CreateServiceForm: FC<PropsType> = ({
  leagueId,
  data,
  serviceNameLabel,
  optionsList,
  sellOrBuy
}) => {
  const dispatch = useTypeDispatch()

  const validationSchema = Yup.object().shape({
    serviceName: Yup.object().shape({
      firstWord: Yup.string().required()
    }),
    currencyId: Yup.number().required(),
    price: Yup.number().required().positive('Must be positive').max(999),
    bulk: Yup.number().required().positive('Must be positive').max(99).integer()
  })

  const formik = useFormik({
    initialValues: {
      leagueId: leagueId,
      serviceName: '' as
        | ''
        | { option: ServiceName | undefined; firstWord: string },
      currencyId: data.currency[0].id,
      price: 1,
      bulk: 1
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.serviceName !== '') {
        const { serviceName, ...other } = values
        void dispatch(
          createServiceThunk({
            ...other,
            sellOrBuy,
            serviceNameId: serviceName.option.id
          })
        )
      }
    }
  })

  const setServiceNameFormikValue = async (
    e: React.SyntheticEvent<Element, Event>,
    value:
      | string
      | { option: ServiceName | undefined; firstWord: string }
      | null
  ) => {
    await formik.setFieldValue('serviceName', value)
  }

  const blockInvalidChar = (e: KeyboardEvent<HTMLInputElement>) =>
    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex">
        <Box mr={1} width={500}>
          <MeAutoCmp
            optionsList={optionsList}
            serviceNameLabel={serviceNameLabel}
            value={formik.values.serviceName}
            onChange={setServiceNameFormikValue}
            error={
              formik.touched.serviceName && Boolean(formik.errors.serviceName)
            }
            helperText={formik.touched.serviceName && formik.errors.serviceName}
          />
        </Box>
        <Box mr={1} width={160}>
          <TextField
            label="Price currency"
            name="currency"
            id="currency"
            fullWidth
            onChange={formik.handleChange}
            select
            value={formik.values.currencyId}
            error={
              formik.touched.currencyId && Boolean(formik.errors.currencyId)
            }
            helperText={formik.touched.currencyId && formik.errors.currencyId}
          >
            {data.currency.map((e) => (
              <MenuItem key={`currency_${e.name}`} value={e.id}>
                {e.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mr={1} width={100}>
          <TextField
            onKeyDown={blockInvalidChar}
            type="number"
            name="price"
            label="Price"
            fullWidth
            id="price"
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
        <Box mr={1} width={75}>
          <TextField
            onKeyDown={blockInvalidChar}
            type="number"
            fullWidth
            name="bulk"
            label="Bulk"
            id="create-bulk"
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
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<AddIcon />}
          disabled={!(formik.dirty && formik.isValid)}
        >
          Create
        </Button>
      </Box>
    </form>
  )
}

export default CreateServiceForm
