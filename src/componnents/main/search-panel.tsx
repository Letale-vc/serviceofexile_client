import { ChangeEvent, KeyboardEvent, SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { matchSorter } from 'match-sorter'
import { useLocation } from 'react-use'

import {
  Tab,
  Box,
  Autocomplete,
  TextField,
  MenuItem,
  Button,
  useTheme
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { parse } from 'querystring'
import { ServiceName } from '../../../server/data/serviceNames/serviceName.entity'
import { useTypeDispatch, useTypeSelector } from '../../redux/hooks'
import { ServiceResponse } from '../../../common-interface/services/services-find'
import { ServicesApi } from '../../api/api'
import { LocalStorage } from '../../storage/localStorage'

interface AutocompleteOption {
  firstWord: string
  option: ServiceName
}

interface SearchUrl {
  serviceCategoryId?: string
  serviceNameId?: string
  leagueId?: string
  sort?: string
  sellOrBuy?: 'WTS' | 'WTB'
}

export type SearchStateType = {
  leagueId: number
  serviceName:
    | {
        firstWord: string
        option: ServiceName
      }
    | string
  sort: string
  sellOrBuy: string
}

const SearchPanel = () => {
  const leagueLocalStorage = new LocalStorage('league')
  const theme = useTheme()
  const history = useNavigate()
  const { search } = useLocation()
  const dispatch = useTypeDispatch()
  const data = useTypeSelector((state) => state.data.data)

  const [searchFetchData, setSearchFetchData] =
    useState<ServiceResponse | null>(null)
  const [category, setCategory] = useState<string>(data.serviceCategoryNames[1])
  const handleOnChangeCategory = (event: SyntheticEvent, newValue: string) => {
    setCategory(newValue)
  }
  const [autocompleteOptions, setAutocompleteOptions] = useState<
    AutocompleteOption[] | undefined[]
  >([])

  const [autocompleteValue, setAutocompleteValue] = useState<
    AutocompleteOption | undefined
  >()

  const [autocompleteInputValueState, setAutocompleteInputValueState] =
    useState<string | undefined>()
  const [sellOrBuy, setSellOrBuy] = useState('WTS')
  const handleOnChangeSellOrBuy = (e: ChangeEvent<HTMLInputElement>) => {
    setSellOrBuy(e.target.value)
  }

  const label = (): string => {
    let returnLabel: string
    data.serviceCategoryNames.forEach((el) => {
      if (category === el) {
        returnLabel = `${el.charAt(0).toUpperCase() + el.slice(1)} search...`
      }
    })
    return returnLabel
  }

  //   useEffect(() => {
  //     const serviceRequestApi = async () => {
  //       try {
  //         const res = await ServicesApi.getServices(searchRequestState)
  //         setSearchFetchData(res.data)
  //       } catch (error) {
  //         setSearchFetchData(null)
  //       }
  //     }

  //     // load  search first render if have  query
  //     if (
  //       searchRequestState === null &&
  //       data !== null &&
  //       autocompleteOptions.length === 0 &&
  //       typeof search === 'string'
  //     ) {
  //       const searchUrl: SearchUrl = parse(search)
  //       // check query param  if have => fetch search
  //       if (
  //         searchUrl.serviceCategoryId &&
  //         searchUrl.serviceNameId &&
  //         searchUrl.leagueId &&
  //         searchUrl.sellOrBuy
  //       ) {
  //         setSearchRequestState({
  //           serviceNameId: Number.parseInt(searchUrl.serviceNameId),
  //           leagueId: Number.parseInt(searchUrl.leagueId),
  //           sellOrBuy: searchUrl.sellOrBuy
  //         })

  //         const createOptions = data.serviceCategory
  //           .find((el) => el.id === Number.parseInt(searchUrl.serviceCategoryId))
  //           .serviceName.map((option) => {
  //             const firstWord = option.name.split(' ')[0]
  //             return {
  //               firstWord,
  //               option
  //             }
  //           })
  //         setAutocompleteOptions(createOptions)
  //       }
  //     }

  //     if (searchRequestState !== null && searchFetchData === null) {
  //       void serviceRequestApi()
  //     }
  //   }, [])

  const getSearch = () => {
    console.log('THIS_NEED_SEARCH')
  }

  const searchLineEnter = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      getSearch()
    }
  }

  const filterOptions = (
    options: {
      firstWord: string
      option: ServiceName
    }[],
    {
      inputValue
    }: {
      inputValue: string
    }
  ) => matchSorter(options, inputValue, { keys: ['firstWord', 'option'] })

  return (
    <>
      <TabContext value={category}>
        <TabList
          onChange={handleOnChangeCategory}
          aria-label="Search Tabs"
          sx={{ minHeight: 0 }}
          // TabIndicatorProps={{
          //   style: {
          //     display: 'none'
          //   }
          // }}
        >
          {data.serviceCategory.map((e) => (
            <Tab
              key={e.name}
              value={e.name}
              label={e.name}
              sx={{
                backgroundColor: `rgba(0, 0, 0, 1)`,
                p: 0,
                minHeight: 30,
                '&.MuiButtonBase-root': {
                  fontSize: '0.6964285714285714rem'
                }
              }}
            />
          ))}
        </TabList>

        {/* back panel */}
        {data.serviceCategory.map((el) => (
          <TabPanel key={`tabPanel_${el.name}`} value={el.name} sx={{ p: 0 }}>
            <Box
              width="100%"
              sx={{
                borderTop: 1,
                borderColor: 'divider',
                background: `rgba(0, 0, 0, 1)`,
                boxShadow: '0 0 15px 5px black inset',
                p: `0 ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(
                  2
                )}`
              }}
            >
              <Box>
                <Box
                  sx={{
                    width: '100%',
                    marginRight: '3px',
                    [theme.breakpoints.down('md')]: {
                      width: '75%'
                    },
                    [theme.breakpoints.down('sm')]: {
                      width: '100%'
                    }
                  }}
                >
                  <Box width="100%">
                    <Autocomplete
                      options={autocompleteOptions.sort(
                        (a, b) => -b.firstWord.localeCompare(a.firstWord)
                      )}
                      getOptionLabel={(option) => option.option.name}
                      isOptionEqualToValue={(option, values) =>
                        option.option.name === values.option.name
                      }
                      filterOptions={filterOptions}
                      groupBy={(option) => option.firstWord}
                      fullWidth
                      value={autocompleteValue}
                      onKeyPress={searchLineEnter}
                      inputValue={autocompleteInputValueState}
                      onInputChange={(event, newInputValue) => {
                        setAutocompleteInputValueState(newInputValue)
                      }}
                      onChange={(event, newValue) => {
                        if (typeof newValue !== 'string') {
                          setAutocompleteValue(newValue)
                        }
                      }}
                      id="search-serviceName"
                      renderInput={(params) => (
                        <TextField
                          hiddenLabel
                          autoFocus
                          {...params}
                          placeholder={`${label()}`}
                        />
                      )}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    justifyContent: 'center',
                    width: '100%',
                    [theme.breakpoints.down('md')]: {
                      width: '25%'
                    },
                    [theme.breakpoints.down('sm')]: {
                      width: '50%',
                      float: 'none'
                    }
                  }}
                >
                  <TextField
                    sx={{ width: 180 }}
                    fullWidth
                    value={leagueLocalStorage.get() || data.league[0].name}
                    select
                    onChange={(event) => {
                      leagueLocalStorage.set(
                        data.league.find(
                          (leagueElement) =>
                            leagueElement.id === Number(event.target.value)
                        )
                      )
                    }}
                    id="league"
                  >
                    {data.league.map((e) => (
                      <MenuItem key={e.id} value={e.name}>
                        {e.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    sx={{ width: 100 }}
                    // todo don forget add value from state
                    value={'priceASC'}
                    select
                    // todo add function and state
                    onChange={() => console.log('SOR_SEARCH')}
                    id="sort-search"
                  >
                    <MenuItem value="priceASC">Price</MenuItem>
                    <MenuItem value="vouchDESC">Vouch</MenuItem>
                  </TextField>
                  <TextField
                    sx={{ width: 100 }}
                    id="select wts or wtb"
                    value={sellOrBuy}
                    onChange={handleOnChangeSellOrBuy}
                    select
                  >
                    <MenuItem key={'WTS'} value={'WTS'}>
                      WTS
                    </MenuItem>
                    <MenuItem key={'WTB'} value={'WTB'}>
                      WTB
                    </MenuItem>
                  </TextField>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%'
                }}
              >
                <Box
                  id="searchPanelBottom-Left"
                  sx={{ display: 'flex', marginRight: 30, width: '15%' }}
                />

                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'centert'
                  }}
                >
                  <Button
                    sx={{ width: 225 }}
                    variant="contained"
                    color="primary"
                    onClick={getSearch}
                    //  ToDo need change
                    disabled={false}
                  >
                    search
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    sx={{ width: '100px' }}
                    variant="contained"
                    color="primary"
                    // todo need to add a cleanup function
                    onClick={() => console.log('CLEAR_BUTTON')}
                    // ToDO need change
                    disabled={false}
                  >
                    Clear
                  </Button>
                </Box>
              </Box>
            </Box>
          </TabPanel>
        ))}
      </TabContext>
    </>
  )
}

export default SearchPanel
