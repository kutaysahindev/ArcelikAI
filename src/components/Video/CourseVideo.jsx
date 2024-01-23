import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import { closeVideoWindow, setSelectedVideo } from "../../redux/videoSlice";
import { FaPlay } from "react-icons/fa";
import { FaForward, FaBackward } from "react-icons/fa6";
import { MdReportGmailerrorred } from "react-icons/md";
import "./CourseVideo.css";
import { postVideoProgress } from "../../api";

const CourseVideo = () => {
  const stateRef = useRef();
  const dispatch = useDispatch();
  const { selectedVideo, lastCompleted, allCompleted, videoCount, videos } = useSelector(
    (state) => state.video
  );
  const user = useSelector((state) => state.user);
  const { videoRef, videoDetails, watchAgain } = useVideoPlayer();
  const { currentTime, progress, isCompleted, status } = videoDetails;
  stateRef.current = currentTime;

  const videoSelector = (num) => {
    dispatch(setSelectedVideo(selectedVideo + num));
  };

  const postCurrentTime = (curr) => {
    // return;
    // console.log('Current Time:', curr);
    const postVideo = async () => {
      try {
        const videoProg = await postVideoProgress(user.accessToken, {
          isWatchedAll: false,
          WatchedVideoId: (selectedVideo===lastCompleted) ? selectedVideo+1 : selectedVideo,
          WatchedTimeInseconds: (selectedVideo===lastCompleted) ? 0 : Math.floor(curr)
        });
      } catch (error) {
        throw error;
      }
    };
    if (user.accessToken.length > 1 && selectedVideo > lastCompleted) postVideo();
  };

  useEffect(() => {
    let intervalId;
    const pCT = () => postCurrentTime(stateRef.current);
    if (status) intervalId = setInterval(pCT, 1000);
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
        src={videos[selectedVideo-1].BlobStorageUrl}
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
