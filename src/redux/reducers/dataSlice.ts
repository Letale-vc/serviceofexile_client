import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DataResponse } from '../../../common-interface/data/data-find'
import { League } from '../../../server/data/league/league.entity'
import { different } from '../../api/api'
import { LocalStorage } from '../../storage/localStorage'

export interface DataState {
  data: null | DataResponse
  selectLeagueDefault: null | League
  status: null | 'loading' | 'succeeded' | 'error'
}
const initialState: DataState = {
  data: null,
  selectLeagueDefault: null,
  status: null
}

export const dataInitialize = createAsyncThunk('data/fetch', async () => {
  const response = await different.data()

  return response.data
})

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSelectLeagueDefault: (
      state,
      action: PayloadAction<{ league: League }>
    ): void => {
      const localStorage = new LocalStorage('league')
      localStorage.set(action.payload.league)
      state.selectLeagueDefault = action.payload.league
    }
  },
  extraReducers: (builder): void => {
    builder.addCase(dataInitialize.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(dataInitialize.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
      const localStorage = new LocalStorage('league')
      if (localStorage.get() !== null) {
        state.selectLeagueDefault = localStorage.get()
      } else if (state.selectLeagueDefault !== null) {
        state.selectLeagueDefault = action.payload.league[0]
      }
    })
  }
})

export const { setSelectLeagueDefault } = dataSlice.actions

export default dataSlice.reducer
