import { Box } from '@mui/material'
import { FC } from 'react'
import SearchPanel from './search-panel'

const Main: FC = () => {
  return (
    <Box minHeight="150px" position="relative">
      <SearchPanel />
      {/* <SearchResult /> */}
    </Box>
  )
}

export default Main
