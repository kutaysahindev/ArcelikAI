import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeVideo } from "../redux/videoSlice";
import { postVideoProgress } from "../api";

const useVideoPlayer = () => {
  const { selectedVideo, completion, videoMark, allCompleted, videoCount, videos } = useSelector((state) => state.video);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [videoDetails, setVideoDetails] = useState({
    status: false,
    videoDuration: 0,
    currentTime: 0,
    progress: 0,
    isCompleted: false,
    replay: false,
    isContinue: "yes",
  });
  const { videoDuration, currentTime, progress, isCompleted, replay, isContinue } =
    videoDetails;

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
    if(videoMark.time > 2 && selectedVideo === videoMark.video && isContinue === "yes") {
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
      if (selectedVideo === videoMark.video && isContinue  === "yes") {
        // video.currentTime = videoMark.time;
        // setDetailsHandler("currentTime", videoMark.time);
        setDetailsHandler("isContinue", "no");
        // video.play();
      }
      else if (Math.abs(delta) > 0.01) {
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
    // const postVideo = async () => {
    //   const lastWatchedVideoId = videos[selectedVideo].Id;
    //   try {
    //     await postVideoProgress(user.accessToken, {
    //       // isWatchedAll: selectedVideo < videoCount ? allCompleted : true,
    //       WatchedVideoId: lastWatchedVideoId+1,
    //       WatchedTimeInseconds: 0
    //     });
    //     console.log("PVP: useVideoPlayer")
    //   } catch (error) {
    //     throw error;
    //   }
    // };
    if (isCompleted && !allCompleted) {
      dispatch(completeVideo(selectedVideo));
      // postVideo();
      console.log("useVideoPlayer")
    }
    // if (allCompleted) {

    // }
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
    isCompleted
  };
};

export default useVideoPlayer;