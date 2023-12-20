import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import navIndexReducer from './navIndexSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    nav: navIndexReducer,
  }
})