import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import navIndexReducer from './navIndexSlice'
import videoReducer from './videoSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    nav: navIndexReducer,
    video: videoReducer,
  }
})