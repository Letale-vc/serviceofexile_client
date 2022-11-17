import { FC, useState } from 'react'
import { useCopyToClipboard } from 'react-use'
import { Box, Typography, Button, useTheme } from '@mui/material'
import { Service } from '../../../../server/service/service.entity'

interface PropsType {
  characterName: string
  service: Service
}

const PublicProfileServiceList: FC<PropsType> = ({
  service,
  characterName
}) => {
  const theme = useTheme()
  const [copyState, setCopyState] = useState('Whisper')

  const copy = () => {
    return `@${characterName} Hi, I'd like to buy your ${service.serviceName.name} for my ${service.price} ${service.currency.name}`
  }

  const [, copyToClipboard] = useCopyToClipboard()
  const clickCopy = () => {
    copyToClipboard(copy())
    setCopyState('Copied...')
  }
  return (
    <Box
      sx={{
        borderBottom: `2px solid rgba(255, 255, 255, 0.1)`,
        background: `rgba(15, 15, 15, 0.8)`,
        padding: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          display: 'block'
        }
      }}
    >
      <Box
        sx={{
          width: '65%',
          textAlign: 'center',
          [theme.breakpoints.down('md')]: {
            width: '100%'
          }
        }}
      >
        <Box>
          <Typography align="center"> {service.serviceName.name}</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography>
            {service.price} <span>×</span>
          </Typography>
          <Box pl={0.4}>
            <Box display="flex">
              <img
                src={service.currency.url}
                style={{ maxWidth: 35 }}
                alt="currency"
              />
              <Typography>{service.currency.name}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        height="100%"
        mt={2}
        sx={{
          width: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          [theme.breakpoints.down('md')]: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }}
      >
        <Button
          sx={{ minWidth: 200, maxWidth: 200 }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={clickCopy}
        >
          {copyState}
        </Button>
      </Box>
    </Box>
  )
}

export default PublicProfileServiceList
