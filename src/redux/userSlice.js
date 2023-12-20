import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  userInfo: {
    name: "hasan",
    surname: "çelik",
    email: "hsn@gmail.com",
    age: 24, //null
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
  }
})

export const {
  signUserIn,
  logUserOut, 
} = userSlice.actions;

export default userSlice.reducer;