import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWindowOpen: true,
  windowContent: "video", // video, quiz
  isModal: false,
  modalProps: {}
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
    showModal: (state) => {
      state.isModal = true;
    },
    hideModal: (state) => {
      state.isModal = false;
    },
    setWindowContent: (state, action) => {
      state.windowContent = action.payload;
    },
    setModalContext: (state, action) => {
      state.isModal = true;
      state.modalProps = action.payload;
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
  setModalContext,
  toggleWindowContent,
  showModal,
  hideModal,
} = windowSlice.actions;

export default windowSlice.reducer;