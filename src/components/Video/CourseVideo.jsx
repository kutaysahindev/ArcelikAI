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
  const { selectedVideo, lastCompleted, allCompleted, videoCount, videos } =
    useSelector((state) => state.video);
  const user = useSelector((state) => state.user);
  const { videoRef, videoDetails, watchAgain } = useVideoPlayer();
  const { currentTime, progress, isCompleted, status } = videoDetails;
  stateRef.current = currentTime;

  const postCurrentTime = (curr) => {
    const postVideo = async () => {
      try {
        const videoProg = await postVideoProgress(user.accessToken, {
          isWatchedAll: false,
          WatchedVideoId:
            selectedVideo === lastCompleted ? selectedVideo + 1 : selectedVideo,
          WatchedTimeInseconds:
            selectedVideo === lastCompleted ? 0 : Math.floor(curr),
        });
      } catch (error) {
        throw error;
      }
    };
    if (user.accessToken.length > 1 && selectedVideo > lastCompleted)
      postVideo();
  };

  useEffect(() => {
    let intervalId;
    const pCT = () => postCurrentTime(stateRef.current);
    if (status) intervalId = setInterval(pCT, 1000);
    return () => clearInterval(intervalId);
  }, [status]);

  return (
    <div className="video-container" id={`${selectedVideo}-cont`}>
      <FullProgressBar isCompleted={isCompleted} progress={progress}/>
      {/* <ProgressBar isCompleted={isCompleted} progress={progress}/> */}
      {/* <p className="info">
        Please watch the video from start to end without changing the playback
        rate and seeking
      </p> */}
      
      {(selectedVideo < 1 || selectedVideo > videoCount) ? (
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
            src={videos[selectedVideo - 1].BlobStorageUrl}
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
