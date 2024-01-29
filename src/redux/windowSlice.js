import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWindowOpen: true,
  windowContent: "quiz"
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
    toggleWindowContent: (state) => {
      if(state.windowContent === "quiz") state.windowContent = "video";
      else if(state.windowContent === "video") state.windowContent = "quiz";
    },
  }
});

export const {
  closeWindow,
  openWindow,
  setWindowContent,
  toggleWindowContent
} = windowSlice.actions;

export default windowSlice.reducer;