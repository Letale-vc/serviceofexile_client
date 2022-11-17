import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import dataSlice from './reducers/dataSlice'
import profileSlice from './reducers/profileSlice'

// const rootReducers = combineReducers({
//   services: servicesReducer,
//   auth: authReducer,
//   profile: profileReducer,
//   fetchStatus: fetchStatusReducer,
//   data: dataReducer
// })
// export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk )) )

const store = configureStore({
  reducer: {
    auth: authSlice,
    data: dataSlice,
    user: profileSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
