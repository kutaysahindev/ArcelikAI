import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import { postVideoProgress } from "../../api";

import { MdReportGmailerrorred } from "react-icons/md";
import "./CourseVideo.css";
import VideoButtonContainer from "./VideoButtonContainer";
import ProgressBar from "./ProgressBar";
import FullProgressBar from "./FullProgressBar";

const CourseVideo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const stateRef = useRef();
  const { selectedVideo, lastCompleted, allCompleted, videoCount, videos } = useSelector((state) => state.video);
  const user = useSelector((state) => state.user);
  const { videoRef, videoDetails, watchAgain } = useVideoPlayer();
  const { currentTime, progress, isCompleted, status } = videoDetails;
  stateRef.current = currentTime;
  stateRef.progress = progress;

  const postCurrentTime = (curr, progress) => {
    const postVideo = async () => {
      const lastWatchedVideoId = videos[selectedVideo].Id;
      try {
        const videoProg = await postVideoProgress(user.accessToken, {
          // isWatchedAll: progress > 90 ? true : false,
          WatchedVideoId:
            selectedVideo === lastCompleted ? lastWatchedVideoId + 1 : lastWatchedVideoId,
          WatchedTimeInseconds:
            selectedVideo === lastCompleted ? 0 : Math.floor(curr),
        });
        console.log("PVP: Course Video")
      } catch (error) {
        throw error;
      }
    };
    if (user.accessToken.length > 1 && selectedVideo > lastCompleted && (progress < 90) ) {
      postVideo();
      // console.log("CourseVideo", progress)
    }
  };

  useEffect(() => {
    let intervalId;
    const pCT = () => postCurrentTime(stateRef.current, stateRef.progress);
    if (status) intervalId = setInterval(pCT, 1000);
    return () => clearInterval(intervalId);
  }, [status]);

  return (
    <div className="video-container" id={`${selectedVideo+1}-cont`}>
      <FullProgressBar isCompleted={isCompleted} progress={progress}/>
      {/* <ProgressBar isCompleted={isCompleted} progress={progress}/> */}
      {/* <p className="info">
        Please watch the video from start to end without changing the playback
        rate and seeking
      </p> */}
      
      {(selectedVideo < 0 || selectedVideo+1 > videoCount) ? (
        <div className="video-not-found">
          <MdReportGmailerrorred size={40} /> <p>Video Not Found</p>
        </div>
      ) : (
        <div className='vc'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <video
            className="video"
            ref={videoRef}
            width="300"
            height="300"
            controls
            controlsList="nodownload noplaybackrate "
            // src={videos[selectedVideo - 1].BlobStorageUrl}
            src={videos[selectedVideo].BlobStorageUrl}
            type="video/mp4"
          />
          <VideoButtonContainer isHovered={isHovered} watchAgain={watchAgain} />
        </div>
      )}
      {/* <p>Current Time: {currentTime.toFixed(2)} seconds</p> */}
      {/* <VideoButtonContainer watchAgain={watchAgain} /> */}
    </div>
  );
};

export default CourseVideo;
