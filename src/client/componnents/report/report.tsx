/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FieldArray, Form, Formik, getIn } from 'formik'
import { useLocation } from 'react-use'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import axios from 'axios'
import { reports } from '../../api/api'
import { Paper, Box, TextField, IconButton, Button } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

const validationSchema = Yup.object().shape({
  accountName: Yup.string().required(`Required`),
  description: Yup.string().required(`Required`),
  arrayLinks: Yup.array().of(
    Yup.string().url(`Must be a URL`).required('Required')
  )
})

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function Report() {
  const query = useQuery()
  const history = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  return (
    <Paper sx={{ padding: 2 }}>
      <Formik
        initialValues={{
          accountName: query.get('accountName') || '',
          description: '',
          arrayLinks: ['']
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            const response = await reports.createReports(values)
            const variant = response.status > 204 ? 'error' : 'success'
            enqueueSnackbar(response.data.message, { variant })
            actions.setSubmitting(false)
            actions.resetForm({
              values: {
                accountName: '',
                description: '',
                arrayLinks: ['']
              }
            })
            history('/report')
          } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
              const variant = err.response.status > 204 ? 'error' : 'success'
              enqueueSnackbar(err.message, { variant })
            }
          }
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          isValid,
          dirty
        }) => (
          <Form autoComplete="off" noValidate>
            <Box display="flex" justifyContent="center">
              <Box width="50%">
                <Box pr={3.1}>
                  <TextField
                    fullWidth
                    disabled={!!query.get('accountName')}
                    id="account-report"
                    label="Account name"
                    name="accountName"
                    onChange={handleChange}
                    value={values.accountName}
                    error={touched.accountName && Boolean(errors.accountName)}
                    helperText={touched.accountName && errors.accountName}
                  />
                </Box>
                <FieldArray name="arrayLinks">
                  {({ push, remove }) => (
                    <div>
                      {values.arrayLinks.map((p, index) => {
                        const link = `arrayLinks[${index}]`
                        const touchedLink = getIn(touched, link)
                        const errorLink = getIn(errors, link)
                        return (
                          <Box
                            key={`arrayLin_${p}`}
                            sx={{
                              display: 'flex',
                              marginTop: 1
                            }}
                          >
                            <TextField
                              fullWidth
                              label="URL screenshot"
                              name={link}
                              value={p}
                              required
                              helperText={
                                touchedLink && errorLink ? errorLink : null
                              }
                              error={Boolean(touchedLink && errorLink)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />

                            <IconButton
                              sx={
                                index === 0
                                  ? {
                                      visibility: 'hidden',
                                      marginTop: 1,
                                      height: '26px'
                                    }
                                  : {
                                      marginTop: 1,
                                      height: '26px'
                                    }
                              }
                              aria-label="delete"
                              onClick={() => remove(index)}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )
                      })}
                      <Box
                        sx={{
                          paddingRight: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {values.arrayLinks.length <= 5 ? (
                          values.arrayLinks[values.arrayLinks.length - 1] ===
                          '' ? (
                            <Box height="44px" />
                          ) : (
                            <IconButton
                              aria-label="add"
                              onClick={() => push('')}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          )
                        ) : (
                          <Box height="44px" />
                        )}
                      </Box>
                    </div>
                  )}
                </FieldArray>
              </Box>
              <Box width="50%" pl={3.1}>
                <TextField
                  fullWidth
                  id="Description"
                  label="Description"
                  multiline
                  name="description"
                  minRows={5}
                  onChange={handleChange}
                  value={values.description}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Box>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
            >
              <Button
                sx={{ minWidth: 100, textAlign: 'center' }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={!(isValid && dirty)}
              >
                Send
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  )
}
