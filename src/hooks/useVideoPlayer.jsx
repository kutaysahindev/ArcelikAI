import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeVideo } from "../redux/videoSlice";

const useVideoPlayer = () => {
  const { selectedVideo, completion } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [videoDetails, setVideoDetails] = useState({
    videoDuration: 0,
    currentTime: 0,
    progress: 0,
    isCompleted: false,
    replay: false,
  });
  const { videoDuration, currentTime, progress, isCompleted, replay } =
    videoDetails;

  const setDetailsHandler = (field, value) => {
    setVideoDetails((prev) => ({ ...prev, [field]: value }));
  };

  const watchAgain = () => {
    setDetailsHandler("replay", true);
    setDetailsHandler("currentTime", 0);
  };

  // useEffect(() => {
  //   console.log("NEW: ", videoDetails);
  // }, [videoDetails]);

  useEffect(() => {
    const video = videoRef.current;
    // console.log('videoRef: ', videoRef)

    setDetailsHandler("videoDuration", video.duration);
    if (replay) {
      video.currentTime = 0;
      setDetailsHandler("replay", false);
      video.play();
    }
    const handleTimeUpdate = () => {
      if (!video.seeking) {
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
      if (Math.abs(delta) > 0.01) {
        console.log("Seeking is disabled");
        video.currentTime = currentTime;
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
    // console.log("progress: ", progress);
    if (progress > 90) setDetailsHandler("isCompleted", true);
    else return;
  }, [progress]);

  // useEffect(() => {
  //   console.log('videoRef: ', selectedVideo, videoRef)
  // }, [videoRef.current?.currentSrc, selectedVideo])

  useEffect(() => {
    if (isCompleted) {
      // console.log('selectedVideo: ', selectedVideo)
      dispatch(completeVideo(selectedVideo));
    }
  }, [isCompleted]);

  useEffect(() => {
    setVideoDetails({
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
    // setDetailsHandler,
    watchAgain,
  };
};

export default useVideoPlayer;
