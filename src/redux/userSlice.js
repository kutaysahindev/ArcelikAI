import { createSlice } from "@reduxjs/toolkit";

const localLoading = localStorage.getItem('isLoading') === "true" ? true : false

const initialState = {
  // isSignedIn: false,
  isSignedIn: localStorage.getItem('isSignedIn') === "true" ? true : false,
  isLoading: localLoading,
  userInfo: {
    name: "",
    email: "",
    date: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUserIn: (state) => {
      state.isSignedIn = true;
      localStorage.setItem('isSignedIn', true);
    },
    logUserOut: (state) => {
      state.isSignedIn = false;
      localStorage.setItem('isSignedIn', false);
    },
    setIsLoading: (state, action) => {
      // state.userInfo = {...state.userInfo, action.payload}
      state.isLoading = action.payload;
      localStorage.setItem('isLoading', action.payload);
    },
    userInfoUpdate: (state, action) => {
      // state.userInfo = {...state.userInfo, action.payload}
      state.userInfo = action.payload;
    },
    approveHandler: (state, action) => {
      state.approve = action.payload;
    },
  }
})

// () => dispatch(userInfoUpdate({name: userSlice.name, email: userSlice.email}))

export const {
  signUserIn,
  logUserOut, 
  userInfoUpdate,
  setIsLoading,
} = userSlice.actions;

export default userSlice.reducer;