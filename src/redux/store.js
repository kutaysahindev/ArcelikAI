//Imports
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import navIndexReducer from "./navIndexSlice";
import videoReducer from "./videoSlice";
import settingsReducer from "./settingSlice";
import quizReducer from "./quizSlice";
import windowReducer from "./windowSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    nav: navIndexReducer,
    video: videoReducer,
    settings: settingsReducer,
    quiz: quizReducer,
    window: windowReducer,
  },
});
