import { combineReducers } from '@reduxjs/toolkit'
import user from 'store/slices/userSlice'
const rootReducer = combineReducers({
	user
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
