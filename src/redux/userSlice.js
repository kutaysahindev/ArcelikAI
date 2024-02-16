import { createSlice } from "@reduxjs/toolkit";

const localLoading =
  localStorage.getItem("isLoading") === "true" ? true : false;

const initialState = {
  // isSignedIn: false,
  isSignedIn: localStorage.getItem("isSignedIn") === "true" ? true : false,
  isLoading: localLoading,
  accessToken: "",
  status: "c",
  userInfo: {
    name: "",
    email: "",
    date: "",
  },
  isTutorialDone: "",
  notificationType: "", // success - message - warning - error
  notificationText: "", 
  notificationTime: 3000,  // 3 - 5 - 10 - 20
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
    },
    setNotification: (state, action) => {
      state.notificationTime = action.payload.time*1000;
      state.notificationType = action.payload.type;
      state.notificationText = action.payload.text;
    },
  },
});

// () => dispatch(userInfoUpdate({name: userSlice.name, email: userSlice.email}))

export const {
  signUserIn,
  logUserOut,
  userInfoUpdate,
  setIsLoading,
  setStatus,
  setAccessToken,
  setIsTutorialDone,
  setNotification,
} = userSlice.actions;

export default userSlice.reducer;
