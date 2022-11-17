import { auth } from '../../api/api'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalStorage } from '../../storage/localStorage'
import { AuthLoginResponse } from '../../../common-interface/auth/auth-login'

export interface AuthState {
  isAuth: boolean
  accountName: null | string
  roles: string[]
}
const initialState: AuthState = {
  isAuth: false,
  accountName: null,
  roles: []
}

type InitialState = typeof initialState

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (code: string) => {
    const { data } = await auth.signin({ code })
    const localStorage = new LocalStorage('user')
    localStorage.set(data)

    return { data }.data
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const userlocalStorage = new LocalStorage('user')
      if (userlocalStorage.get() && userlocalStorage.get() !== null) {
        state.isAuth = true
        state.accountName = userlocalStorage.get().accountName
        state.roles = userlocalStorage.get().roles
      }
    },
    loggedOut: (state) => {
      state.isAuth = false
      state.accountName = null
      state.roles = []
      const userlocalStorage = new LocalStorage('user')
      userlocalStorage.remove()
    },
    userReseived: (state, action: PayloadAction<AuthLoginResponse>) => {
      const localStorage = new LocalStorage('user')
      localStorage.set(action.payload)
      state.isAuth = true
      state.accountName = action.payload.accountName
      state.roles = action.payload.roles
    }
  }
})

export const { initializeAuth, loggedOut, userReseived } = authSlice.actions
export default authSlice.reducer
