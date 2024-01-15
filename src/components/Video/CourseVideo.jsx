import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import { closeVideoWindow, setSelectedVideo } from "../../redux/videoSlice";
import { FaPlay } from "react-icons/fa";
import { FaForward, FaBackward } from "react-icons/fa6";
import { MdReportGmailerrorred } from "react-icons/md";
import "./CourseVideo.css";
import { videos } from "../../utils/videos";

const CourseVideo = () => {
  const stateRef = useRef();
  const dispatch = useDispatch();
  const { selectedVideo, lastCompleted, allCompleted, videoCount } = useSelector(
    (state) => state.video
  );
  const { videoRef, videoDetails, watchAgain } = useVideoPlayer();
  const { currentTime, progress, isCompleted, status } = videoDetails;
  stateRef.current = currentTime;

  const videoSelector = (num) => {
    dispatch(setSelectedVideo(selectedVideo + num));
  };

  const postCurrentTime = (curr) => {
    return;
    console.log('Current Time:', curr);
  };

  useEffect(() => {
    let intervalId;
    const pCT = () => postCurrentTime(stateRef.current);
    if (status) intervalId = setInterval(pCT, 2000);
    return () => clearInterval(intervalId);
  }, [status]);

  return (
    <div className="video-container" id={`${selectedVideo}-cont`}>
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${isCompleted ? 100 : progress}%`,
          }}
        />
      </div>
      <p className="info">
        Please watch the video from start to end without changing the playback
        rate and seeking
      </p>
      <video
        className="video"
        ref={videoRef}
        width="300"
        height="300"
        controls
        controlsList="nodownload noplaybackrate "
        src={videos[selectedVideo-1].src}
        type="video/mp4"
      />
      {(selectedVideo<1 || selectedVideo>videoCount) && <div className="video-not-found"><MdReportGmailerrorred size={40}/> <p>Video Not Found</p></div>}
      {/* <p>Current Time: {currentTime.toFixed(2)} seconds</p> */}
      <div className="btn-container">
        <button
          className="btns previous"
          onClick={() => videoSelector(-1)}
          disabled={selectedVideo <= 1}
        >
          <FaBackward />
          <span>Previous</span>
        </button>
        <button className="btns again" onClick={watchAgain}>
          <span>Watch Again</span>
          <FaPlay />
        </button>
        {selectedVideo < videoCount ? (
          <button
            className="btns next"
            onClick={() => videoSelector(1)}
            disabled={lastCompleted < selectedVideo}
          >
            <span>Next</span>
            <FaForward />
          </button>
        ) : (
          <button
            className="btns close"
            onClick={() => dispatch(closeVideoWindow())}
            disabled={!allCompleted}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseVideo;
