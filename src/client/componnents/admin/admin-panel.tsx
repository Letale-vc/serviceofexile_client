// import { Box, Button, MenuItem, Paper, TextField } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import * as Yup from 'yup'
import { RootState } from '../../redux/store'
import { admin } from '../../api/api'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { Paper, TextField } from '@mui/material'
import { useTypeSelector } from '../../redux/hooks'
import { FC } from 'react'

export default function AdminPanel() {
  const roles = useTypeSelector((state) => state.auth.roles)

  if (!roles.includes('moderator')) {
    return <Navigate to="/login" />
  }

  return (
    <Paper
      sx={{
        padding: 1,
        marginTop: 1
      }}
    >
      <Formik
        initialValues={{
          accountName: '',
          reasonBan: ''
        }}
        validationSchema={Yup.object().shape({
          accountName: Yup.string().required(`Required`),
          reasonBan: Yup.string().required(`Required`)
        })}
        onSubmit={async (values, actions) => {
          await admin.ban(values)
          actions.setSubmitting(false)
          actions.resetForm({
            values: {
              accountName: '',
              reasonBan: ''
            }
          })
        }}
      >
        {({ values, touched, errors, handleChange, isValid, dirty }) => (
          <Form>
            <Box
              sx={{
                padding: 2,
                width: '100%',
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Box width="30%" mr={1}>
                <TextField
                  fullWidth
                  name="accountName"
                  label="Account name"
                  id="admin-panel-banned-accountName"
                  onChange={handleChange}
                  value={values.accountName}
                  error={touched.accountName && Boolean(errors.accountName)}
                  helperText={touched.accountName && errors.accountName}
                />
              </Box>
              <Box width="30%" mr={1}>
                <TextField
                  fullWidth
                  name="reasonBan"
                  label="Reason ban"
                  id="admin-panel-banned-reason-ban"
                  onChange={handleChange}
                  value={values.reasonBan}
                  error={touched.reasonBan && Boolean(errors.reasonBan)}
                  helperText={touched.reasonBan && errors.reasonBan}
                />
              </Box>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!(isValid && dirty)}
                >
                  give ban
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{
          accountName: ''
        }}
        validationSchema={Yup.object().shape({
          accountName: Yup.string().required(`Required`)
        })}
        onSubmit={async (values, actions) => {
          await admin.unban(values)
          actions.setSubmitting(false)
          actions.resetForm({
            values: {
              accountName: ''
            }
          })
        }}
      >
        {({ values, touched, errors, handleChange, isValid, dirty }) => (
          <Form>
            <Box
              sx={{
                padding: 2,
                width: '100%',
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Box width="30%" mr={1}>
                <TextField
                  fullWidth
                  name="accountName"
                  label="Account name"
                  id="admin-panel-banned-accountName"
                  onChange={handleChange}
                  value={values.accountName}
                  error={touched.accountName && Boolean(errors.accountName)}
                  helperText={touched.accountName && errors.accountName}
                />
              </Box>

              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!(isValid && dirty)}
                >
                  unban
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      {/* 
      {roles.includes('admin') ? (
        <>
          <Formik
            initialValues={{
              accountName: '',
              role: null as null | number
            }}
            validationSchema={Yup.object().shape({
              accountName: Yup.string().required(`Required`),
              role: Yup.string().required(`Required`)
            })}
            onSubmit={(values, actions) => {
              admin.giveRole(values)

              actions.setSubmitting(false)
              actions.resetForm({
                values: {
                  accountName: '',
                  role: null
                }
              })
            }}
          >
            {({ values, touched, errors, handleChange, isValid, dirty }) => (
              <Form>
                <Box
                  sx={{
                    padding: 2,
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Box width="30%" mr={1}>
                    <TextField
                      fullWidth
                      name="accountName"
                      label="Account name"
                      id="admin-panel-role-accountName"
                      onChange={handleChange}
                      value={values.accountName}
                      error={touched.accountName && Boolean(errors.accountName)}
                      helperText={touched.accountName && errors.accountName}
                    />
                  </Box>
                  <Box width="30%" mr={1}>
                    <TextField
                      fullWidth
                      SelectProps={{
                        MenuProps: {
                          variant: 'menu',
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left'
                          }
                        }
                      }}
                      select
                      id="admin-panel-role"
                      label="role?"
                      name="role"
                      onChange={handleChange}
                      value={values.role}
                      error={touched.role && Boolean(errors.role)}
                      helperText={touched.role && errors.role}
                    >
                      <MenuItem value={3}>Moderator</MenuItem>
                      <MenuItem value={2}>Admin</MenuItem>
                    </TextField>
                  </Box>
                  <Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!(isValid && dirty)}
                    >
                      give role
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>

          <Formik
            initialValues={{
              uuid: ''
            }}
            validationSchema={Yup.object().shape({
              uuid: Yup.string().required(`Required`)
            })}
            onSubmit={(values, actions) => {
              admin.roleUpdate(values)
              actions.setSubmitting(false)
              actions.resetForm({
                values: {
                  uuid: ''
                }
              })
            }}
          >
            {({ values, touched, errors, handleChange, isValid, dirty }) => (
              <Form>
                <Box
                  sx={{
                    padding: 2,
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Box width="30%" mr={1}>
                    <TextField
                      fullWidth
                      name="accountName"
                      label="Account name"
                      id="admin-panel-role-accountName"
                      onChange={handleChange}
                      value={values.accountName}
                      error={touched.accountName && Boolean(errors.accountName)}
                      helperText={touched.accountName && errors.accountName}
                    />
                  </Box>

                  <Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!(isValid && dirty)}
                    >
                      remove role
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      ) : null} */}
    </Paper>
  )
}
