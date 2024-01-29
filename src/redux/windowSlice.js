import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWindowOpen: true,
  windowContent: "video"
}

export const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    closeWindow: (state) => {
      state.isWindowOpen = false;
    },
    openWindow: (state) => {
      state.isWindowOpen = true;
    },
    setWindowContent: (state, action) => {
      state.windowContent = action.payload;
    },
  }
});

export const {
  closeWindow,
  openWindow,
  setWindowContent
} = windowSlice.actions;

export default windowSlice.reducer;