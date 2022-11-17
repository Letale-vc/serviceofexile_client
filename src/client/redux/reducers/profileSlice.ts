import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ServicesCreateRequest } from '../../../common-interface/services/services-create'
import { ServicesDeleteRequest } from '../../../common-interface/services/services-delete'
import { ServiceUpdateRequest } from '../../../common-interface/services/services-update'
import { UserResponse } from '../../../common-interface/user/userResponse'
import { profileApi, ServicesApi } from '../../api/api'

const initialState = {
  profile: null as UserResponse | null,
  status: null as null | 'loading' | 'succeeded'
}

export const getProfileThunk = createAsyncThunk('profile/fetch', async () => {
  const { data } = await profileApi.getProfile()
  return data
})

export const updateServiceThunk = createAsyncThunk(
  'profile/updateService',
  async (object: ServiceUpdateRequest) => {
    await ServicesApi.updateService(object)
    return object
  }
)
export const createServiceThunk = createAsyncThunk(
  'profile/createService',
  async (object: ServicesCreateRequest) => {
    const { data } = await ServicesApi.createService(object)
  }
)

export const deleteServiceThunk = createAsyncThunk(
  'profile/deleteService',
  async (data: ServicesDeleteRequest) => {
    await ServicesApi.deleteService(data)
    return data
  }
)
export const updatePoeProfileThunk = createAsyncThunk(
  'profile/poeUpdate',
  async () => {
    return profileApi.updateProfile()
  }
)
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileThunk.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.profile = action.payload
    })
    builder.addCase(updateServiceThunk.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.profile.services.map((el) => {
        if (el.uuid === action.payload.uuid) {
          return action.payload
        }
        return el
      })
    })
    builder.addCase(deleteServiceThunk.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.profile.services.filter((el) => el.uuid === action.payload.uuid)
    })
    builder.addCase(updatePoeProfileThunk.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.profile.accountName = action.payload.data.accountName
      state.profile.characterName = action.payload.data.characterName
    })
  }
})

export default profileSlice.reducer
