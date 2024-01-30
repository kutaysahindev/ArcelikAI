//Imports
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeVideo } from "../redux/videoSlice";
import { postVideoProgress } from "../api";

const useVideoPlayer = () => {
  const { selectedVideo, completion, videoMark, allCompleted } = useSelector(
    (state) => state.video
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  //Video player settings, some will be updated from DB later on
  const [videoDetails, setVideoDetails] = useState({
    status: false,
    videoDuration: 0,
    currentTime: 0,
    progress: 0,
    isCompleted: false,
    replay: false,
    isContinue: "yes",
  });
  const {
    videoDuration,
    currentTime,
    progress,
    isCompleted,
    replay,
    isContinue,
  } = videoDetails;

  const setDetailsHandler = (field, value) => {
    setVideoDetails((prev) => ({ ...prev, [field]: value }));
  };

  const watchAgain = () => {
    setDetailsHandler("replay", true);
    setDetailsHandler("currentTime", 0);
  };

  useEffect(() => {
    const video = videoRef.current;
    // console.log('isContinue: ', isContinue)
    if (
      videoMark.time > 2 &&
      selectedVideo === videoMark.video &&
      isContinue === "yes"
    ) {
      video.currentTime = videoMark.time;
      setDetailsHandler("currentTime", videoMark.time);
    }
    setDetailsHandler("videoDuration", video.duration);
    if (replay) {
      video.currentTime = 0;
      setDetailsHandler("replay", false);
      video.play();
    }
    const handleTimeUpdate = () => {
      if (!video.seeking) {
        setDetailsHandler("status", !video.paused);
        setDetailsHandler("currentTime", video.currentTime);
        if (videoDuration > 0 && currentTime > 0)
          setDetailsHandler(
            "progress",
            Math.ceil((currentTime / videoDuration) * 100)
          );
      }
    };
    const handleSeeking = () => {
      const delta = video.currentTime - currentTime;
      if (selectedVideo === videoMark.video && isContinue === "yes") {
        setDetailsHandler("isContinue", "no");
        // video.play();
      } else if (Math.abs(delta) > 0.01) {
        console.log("Seeking is disabled");
        video.currentTime = currentTime;
        // video.play();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeking", handleSeeking);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("seeking", handleSeeking);
    };
  }, [currentTime, selectedVideo]);

  useEffect(() => {
    if (progress > 90) setDetailsHandler("isCompleted", true);
    else return;
  }, [progress]);

  useEffect(() => {
    const postVideo = async () => {
      try {
        const videoProg = await postVideoProgress(user.accessToken, {
          isWatchedAll: allCompleted,
          WatchedVideoId: selectedVideo + 1,
          WatchedTimeInseconds: 0,
        });
      } catch (error) {
        throw error;
      }
    };
    if (isCompleted) {
      dispatch(completeVideo(selectedVideo));
      postVideo();
    }
  }, [isCompleted]);

  useEffect(() => {
    setVideoDetails({
      ...videoDetails,
      videoDuration: 0,
      currentTime: 0,
      progress: 0,
      isCompleted: false,
      replay: false,
    });
  }, [selectedVideo]);

  return {
    videoRef,
    videoDetails,
    watchAgain,
  };
};

export default useVideoPlayer;
