import { useRef, useState, useEffect } from "react";

const InformativeVideo = ({ src }) => {
  const videoRef = useRef(null);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [videoDuration, setVideoDuration] = useState(0);
  // const [again, setAgain] = useState(false)
  // const [progress, setProgress] = useState(0)
  // const [isCompleted, setIsCompleted] = useState(false)
  const [videoDetails, setVideoDetails] = useState({
    videoDuration: 0,
    currentTime: 0,
    progress: 0,
    isCompleted: false,
    replay: false
  })
  const {videoDuration, currentTime, progress, isCompleted, replay} = videoDetails;
  // const videoDuration = videoRef.current.duration;

  const setDetailsHandler = (field, value) => {
    setVideoDetails(prev => ({...prev, [field]: value}))
  }

  useEffect(() => {
    console.log('NEW: ', videoDetails)
  }, [videoDetails])
  

  useEffect(() => {
    const video = videoRef.current;
    // setVideoDuration(video.duration);
    setDetailsHandler("videoDuration", video.duration)
    if (replay){
      video.currentTime=0;
      // setAgain(false)
      setDetailsHandler("replay", false)
      video.play();
    }
    const handleTimeUpdate = () => {
      if(!video.seeking) {
      // setCurrentTime(video.currentTime);
      // setProgress(((currentTime/videoDuration)*100).toFixed(2))
      setDetailsHandler("currentTime", video.currentTime)
      setDetailsHandler("progress", (Math.ceil((currentTime/videoDuration)*100)))
      }
    };
    const handleSeeking = () => {
      // Set the currentTime back to the desired position to disable seeking
      const delta = video.currentTime - currentTime;
      if (Math.abs(delta) > 0.01) {
        console.log("Seeking is disabled");
        video.currentTime = currentTime;
      }
    };
    // Attach the event listener when the component mounts
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeking", handleSeeking);
    // Cleanup: remove the event listener when the component unmounts
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("seeking", handleSeeking);
    };
  }, [currentTime]);

  useEffect(() => {
    console.log("progress: ",progress);
    // if(progress > 95) setIsCompleted(true)
    if(progress > 95) setDetailsHandler("isCompleted", true)
    else return
  }, [progress])
  

  const watchAgain = () => {
    // setAgain(true)
    // setCurrentTime(0)
    setDetailsHandler("replay", true)
    setDetailsHandler("currentTime", 0)
  }

  return (
    <div className="video-container">
      <p className="info">Please watch the video from start to end without changing the playback rate and seeking</p>
      <video className="video" ref={videoRef} width="300" height="300" controls controlsList="nodownload noplaybackrate ">
        <source src={src} type="video/mp4" />
      </video>

      <p>Current Time: {currentTime.toFixed(2)} seconds</p>
      <p className={`${isCompleted ? 'completed' : ''}`}>Progress: {isCompleted ? "Completed" : progress+'%'}</p>
      <button onClick={watchAgain}>Watch Again</button>
    </div>
  );
};

export default InformativeVideo;
