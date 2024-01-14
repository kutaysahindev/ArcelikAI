import { createSlice } from "@reduxjs/toolkit";
import { getVideos } from "../api";

const initialState = {
  isVideoWindowOpen: true,
  selectedVideo: 1,
  lastCompleted: 0,
  allCompleted: false,
  completion: {
    video1: false,
    video2: false,
    video3: false,
  },
  videos: [
    { id: 1, url: "video_url_1.mp4" },
    { id: 2, url: "video_url_2.mp4" },
    { id: 3, url: "video_url_3.mp4" },
  ],
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
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
      if (action.payload === 3) state.allCompleted = true;
    },
  },
});

export const fetchVideos = () => async (dispatch) => {
  try {
    const videos = await getVideos();
    dispatch(setVideos(videos));
  } catch (error) {
    console.log("error fetching videos: ", error);
  }
};

// Action creators are generated for each case reducer function
export const {
  completeVideo,
  setSelectedVideo,
  closeVideoWindow,
  openVideoWindow,
  setVideos,
} = videoSlice.actions;

export default videoSlice.reducer;
