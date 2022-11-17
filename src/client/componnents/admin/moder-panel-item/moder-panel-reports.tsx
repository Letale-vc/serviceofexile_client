import {
  Paper,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button
} from '@mui/material'
import { amber } from '@mui/material/colors'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { reports } from '../../../api/api'

interface ReportType {
  arrayLinks: Array<string>
  description: string
  statusClose: boolean
  id: number
  userUuid: string
  user: {
    uuid: string
    accountName: string
    characterName: string
    discord: string
    createdAt: string
  }
}

export default function ModerReports() {
  const [reportsList, setReports] = useState<ReportType[]>([])

  const getListReports = async () => {
    // const res = await reports.reports(false)
    // setReports({ ...res.data.reports })
  }

  useEffect(() => {
    void getListReports()
  }, [])

  return (
    <>
      {reportsList.map((el) => (
        <Paper sx={{ display: 'flex', padding: 1, marginTop: 1 }} key={el.id}>
          <Box width="50%">
            <Typography>
              Account name:{' '}
              <NavLink
                // sx={{
                //   '&:hover': {
                //     cursor: 'pointer',
                //     color: amber[300]
                //   }
                // }}
                // underline="none"
                to={`/public/${el.user.accountName}`}
              >
                {el.user.accountName}
              </NavLink>
            </Typography>
            <Typography>Screenshot links: </Typography>
            {el.arrayLinks.map((linkEl, index) => (
              <Link
                to={linkEl}
                key={`Screenshot_link_${el.id}`}
                // sx={{ marginLeft: 2 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link {index}
              </Link>
            ))}
            <Typography>Description: {el.description}</Typography>
          </Box>
          <Box>
            <Formik
              initialValues={{
                statusAccept: ''
              }}
              validationSchema={Yup.object().shape({
                statusAccept: Yup.string().required(`Required`)
              })}
              onSubmit={async (values, actions) => {
                await reports.closeReports({
                  accountName: el.user.accountName,
                  id: el.id,
                  userUuid: el.userUuid,
                  statusAccept: values.statusAccept === 'Accept'
                })
                await getListReports()
                actions.setSubmitting(false)
                actions.resetForm({
                  values: {
                    statusAccept: ''
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
                    <Box width="200px" mr={1}>
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
                        id="statusAccept"
                        label="Approve a complaint"
                        name="statusAccept"
                        onChange={handleChange}
                        value={values.statusAccept}
                        error={
                          touched.statusAccept && Boolean(errors.statusAccept)
                        }
                        helperText={touched.statusAccept && errors.statusAccept}
                      >
                        <MenuItem value="Accept">Accept</MenuItem>
                        <MenuItem value="Cancel">Cancel</MenuItem>
                      </TextField>
                    </Box>

                    <Box>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!(isValid && dirty)}
                      >
                        Close
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      ))}
    </>
  )
}
