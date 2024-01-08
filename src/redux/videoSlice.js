import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isVideoWindowOpen: true,
  selectedVideo: 1,
  lastCompleted: 0,
  completion: {
    video1: false,
    video2: false,
    video3: false,
  },
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    closeVideoWindow: (state) => {
      state.isVideoWindowOpen = false;
    },
    openVideoWindow: (state) => {
      state.isVideoWindowOpen = true;
    },
    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload;
    },
    completeVideo: (state, action) => {
      state.completion["video" + action.payload] = true;
      state.lastCompleted = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { completeVideo, setSelectedVideo, closeVideoWindow, openVideoWindow } = videoSlice.actions

export default videoSlice.reducer