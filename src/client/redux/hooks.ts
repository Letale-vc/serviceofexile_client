import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useTypeDispatch = () => useDispatch<AppDispatch>()

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector
