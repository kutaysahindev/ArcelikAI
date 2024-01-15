import { createSlice } from "@reduxjs/toolkit";
import { getVideos } from "../api";

const localLastCompleted = localStorage.getItem("lastCompleted") ? Number(localStorage.getItem("lastCompleted")) : 0;
const localAllCompleted = localStorage.getItem("allCompleted") === "true" ? true : false;
const localVideoCount = localStorage.getItem("videoCount") ? Number(localStorage.getItem("videoCount")) : 0;
const localVideoMark = localStorage.getItem("videoMark") ? localStorage.getItem("videoMark") : {};

const initialState = {
  isVideoWindowOpen: true,
  selectedVideo: 1,
  lastCompleted: localLastCompleted,
  allCompleted: localAllCompleted,
  completion: {
    video1: false,
    video2: false,
    video3: false,
  },
  videoCount: localVideoCount,
  videoMark: localVideoMark,
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
      if (state.selectedVideo > state.lastCompleted) {
        state.completion["video" + action.payload] = true;
        state.lastCompleted = action.payload;
        localStorage.setItem("lastCompleted", action.payload);
      }
      if (state.videoCount > 0 && action.payload === state.videoCount) {
        state.allCompleted = true;
        localStorage.setItem("allCompleted", true);
      }
    },
    setVideoCount: (state, action) => {
      state.videoCount = action.payload;
      localStorage.setItem("videoCount", action.payload);
    },
    proceedAt: (state, action) => {
      const { video, time } = action.payload;
      state.videoMark = action.payload;
      state.selectedVideo = video;
      state.completion["video" + video - 1] = true;
      state.lastCompleted = video - 1;
      localStorage.setItem("lastCompleted", video - 1);
    },
    completeAll: (state) => {
      state.lastCompleted = state.videoCount;
      localStorage.setItem("lastCompleted", state.videoCount);
      state.allCompleted = true;
      localStorage.setItem("allCompleted", true);
      state.videoMark = {};
      localStorage.setItem("videoMark", {});
      closeVideoWindow();
    },
    setVideoMark: (state, action) => {
      // const { video, time } = action.payload
      state.videoMark = action.payload;
      localStorage.setItem("videoMark", action.payload);
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
  setVideoCount,
  setVideoMark,
  proceedAt,
  completeAll,
  setVideos,
} = videoSlice.actions;

export default videoSlice.reducer;
