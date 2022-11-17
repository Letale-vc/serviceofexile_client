import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query'
import { AuthLoginResponse } from '../../common-interface/auth/auth-login'
import { loggedOut, userReseived } from '../redux/reducers/authSlice'
import { LocalStorage } from '../storage/localStorage'

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers) => {
    const userLocalStorage = new LocalStorage('user')
    if (userLocalStorage.get().access_token) {
      headers.set(
        'Authorization',
        `Bearer ${userLocalStorage.get().access_token}`
      )
    }
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      { url: '/refreshToken', method: 'POST' },
      api,
      extraOptions
    )
    if (refreshResult && refreshResult.data) {
      // store the new token
      // api.dispatch(userReseived(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(loggedOut())
    }
  }
  return result
}
