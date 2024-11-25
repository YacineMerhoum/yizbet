
import { configureStore } from '@reduxjs/toolkit'
import matchReducer from '../slices/matchSlice'
import matchDayReducer from '../slices/sectionSlice'
import balanceReducer from '../slices/balanceSlice'
import userReducer from '../slices/userSlice'


export const store = configureStore({
  reducer: {
    match: matchReducer,
    matchDay: matchDayReducer,
    balance: balanceReducer,
    user: userReducer
  },
})
