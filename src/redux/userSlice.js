import { createSlice } from "@reduxjs/toolkit";

const localLoading =
  localStorage.getItem("isLoading") === "true" ? true : false;
const localTour =
  localStorage.getItem("isTutorialDone") ? localStorage.getItem("isTutorialDone") : "none";

const localAccessToken = JSON.parse(localStorage.getItem("okta-token-storage"))?.accessToken ? JSON.parse(localStorage.getItem("okta-token-storage")).accessToken.accessToken : ""

const initialState = {
  userRole: "",
  isSignedIn: localStorage.getItem("isSignedIn") === "true" ? true : false,
  isLoading: localLoading,
  accessToken: localAccessToken,
  status: "c",
  userInfo: {
    name: "",
    email: "",
    date: "",
  },
  isTutorialDone: localTour,
  notificationType: "", // success - message - warning - error
  notificationText: "", 
  notificationTime: 0,  // 3 - 5 - 10 - 20
  notificationDirection: "up",  // up - down
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUserIn: (state) => {
      state.isSignedIn = true;
      localStorage.setItem("isSignedIn", true);
      state.status = "s";
    },
    logUserOut: (state) => {
      state.isSignedIn = false;
      localStorage.setItem("isSignedIn", false);
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
      localStorage.setItem("isLoading", action.payload);
    },
    userInfoUpdate: (state, action) => {
      // state.userInfo = {...state.userInfo, action.payload}
      state.userInfo = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setIsTutorialDone: (state, action) => {
      state.isTutorialDone = action.payload;
      localStorage.setItem("isTutorialDone", action.payload);
    },
    setNotification: (state, action) => {
      state.notificationTime = action.payload.time ? action.payload.time*1000 : 5000;
      state.notificationType = action.payload.type;
      state.notificationText = action.payload.text;
      if(action.payload.text) state.notificationDirection = "down";
    },
    setNotificationDirection: (state) => {
      state.notificationDirection = "up";
    },
  },
});

// () => dispatch(userInfoUpdate({name: userSlice.name, email: userSlice.email}))

export const {
  signUserIn,
  logUserOut,
  setUserRole,
  userInfoUpdate,
  setIsLoading,
  setStatus,
  setAccessToken,
  setIsTutorialDone,
  setNotification,
  setNotificationDirection,
} = userSlice.actions;

export default userSlice.reducer;
