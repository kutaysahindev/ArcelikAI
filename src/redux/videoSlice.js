import { createSlice } from "@reduxjs/toolkit";
import { getVideos } from "../api";
import { videosArray } from "../utils/videos";

const localLastCompleted = localStorage.getItem("lastCompleted")
  ? Number(localStorage.getItem("lastCompleted"))
  : 0;
const localAllCompleted =
  localStorage.getItem("allCompleted") === "true" ? true : false;
const localVideoCount = localStorage.getItem("videoCount")
  ? Number(localStorage.getItem("videoCount"))
  : 0;
const localVideoMark = localStorage.getItem("videoMark")
  ? localStorage.getItem("videoMark")
  : {};
const localVideos = localStorage.getItem("videos")
  ? JSON.parse(localStorage.getItem("videos"))
  : [];

const initialState = {
  isVideoWindowOpen: true,
  selectedVideo: 0,
  lastCompleted: localLastCompleted,
  allCompleted: localAllCompleted,
  completion: {
    video1: false,
    video2: false,
    video3: false,
  },
  videoCount: localVideoCount,
  videoMark: localVideoMark,
  videos: localVideos,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
      localStorage.setItem("videos", JSON.stringify(action.payload));
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
      const indx = state.videos.indexOf(video)
      state.allCompleted = false;
      localStorage.setItem("allCompleted", false);
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
      state.selectedVideo = state.videos[0].Id;
    },
    setVideoMark: (state, action) => {
      // const { video, time } = action.payload
      state.videoMark = action.payload;
      localStorage.setItem("videoMark", action.payload);
    },
    setAllCompletedTrue: (state) => {
      state.allCompleted = true;
      localStorage.setItem("allCompleted", true);
    },
    setAllCompletedFalse: (state) => {
      state.allCompleted = false;
      localStorage.setItem("allCompleted", false);
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
  setAllCompletedTrue,
  setAllCompletedFalse,
} = videoSlice.actions;

export default videoSlice.reducer;
