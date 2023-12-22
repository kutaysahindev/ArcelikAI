import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  userInfo: {
    name: "",
    email: "",
    date: "",
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUserIn: (state) => {
      state.isSignedIn = true;
    },
    logUserOut: (state) => {
      state.isSignedIn = false;
    },
    userInfoUpdate: (state, action) => {
      // state.userInfo = {...state.userInfo, action.payload}
      state.userInfo = action.payload;
    },
  }
})

// () => dispatch(userInfoUpdate({name: userSlice.name, email: userSlice.email}))

export const {
  signUserIn,
  logUserOut, 
  userInfoUpdate,
} = userSlice.actions;

export default userSlice.reducer;