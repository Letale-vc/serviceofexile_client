import React, { FC, useState } from 'react'
import { Paper, Box, TextField, MenuItem, Typography } from '@mui/material'
import UpdateServiceForm from './componnents/update-service-form'
import CreateServiceForm from './componnents/create-service-form'
import { UserResponse } from '../../../common-interface/user/userResponse'
import { useTypeSelector } from '../../redux/hooks'
import { useLocalStorage } from '../../storage/localStorage'

interface PropsType {
  profile: UserResponse
}

const ProfileServices: FC<PropsType> = ({ profile }) => {
  const defaultLeague = useTypeSelector(
    (state) => state.data.selectLeagueDefault
  )
  const [getLocalStorage, setLocalStorage] = useLocalStorage('league')

  const data = useTypeSelector((state) => state.data.data)
  const [serviceCategoryName, setService] = useState(
    data.serviceCategoryNames[0]
  )
  const [defLeagueId, setDefLeague] = useState(
    defaultLeague.id || data.league[0].id
  )
  const [wtsOrWtb, setWtsOrWtb] = useState('WTS')

  const optionList = data.serviceCategory.find(
    (el2) => el2.name === serviceCategoryName
  )?.serviceName

  const serviceListing = () => {
    if (Array.isArray(profile.services) && optionList !== undefined)
      return profile.services
        .filter(
          (el) => el.league.id === defLeagueId && el.sellOrBuy === wtsOrWtb
        )
        .map((el, index) => (
          <UpdateServiceForm
            index={index}
            service={el}
            optionsList={optionList}
            key={el.uuid}
          />
        ))
    return null
  }

  return (
    <>
      <Paper sx={{ marginTop: 2, padding: 2, marginBottom: 2, width: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: 150, marginBottom: 2, marginRight: 3 }}>
            <TextField
              label="Select service"
              value={serviceCategoryName}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setService(value.target.value)
              }}
              select
              fullWidth
            >
              {data.serviceCategoryNames.map((e) => (
                <MenuItem key={`${e}`} value={e}>
                  {e[0].toUpperCase() + e.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ width: 150, marginBottom: 2, marginRight: 3 }}>
            <TextField
              label="League"
              id="select  def league"
              value={defLeagueId}
              onChange={(event) => {
                setDefLeague(Number(event.target.value))
                setLocalStorage(
                  data.league.find((el) => el.id === Number(event.target.value))
                )
              }}
              select
              fullWidth
            >
              {data.league.map((e) => (
                <MenuItem key={`league_${e.name}`} value={e.id}>
                  {e.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ width: 150, marginBottom: 2, marginRight: 3 }}>
            <TextField
              label="Sell or buy"
              id="select wts or wtb"
              value={wtsOrWtb}
              onChange={(event) => {
                setWtsOrWtb(event.target.value)
              }}
              select
              fullWidth
            >
              <MenuItem key={'WTS'} value="WTS">
                WTS
              </MenuItem>
              <MenuItem key={'WTB'} value="WTB">
                WTB
              </MenuItem>
            </TextField>
          </Box>
        </Box>
        <Typography sx={{ marginBottom: 2, marginTop: 2 }}>
          Create services
        </Typography>
        {optionList ? (
          <CreateServiceForm
            leagueId={defLeagueId}
            data={data}
            serviceNameLabel={serviceCategoryName}
            optionsList={optionList}
            sellOrBuy={wtsOrWtb}
          />
        ) : null}
      </Paper>
      {serviceListing()}
    </>
  )
}

export default ProfileServices
