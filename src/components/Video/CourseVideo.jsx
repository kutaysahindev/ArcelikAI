import { useRef, useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { FaForward, FaBackward } from "react-icons/fa6";
import { MdOutlineReplay } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import "./CourseVideo.css";

import sample1 from "../../assets/videos/sample1.mp4";
import sample2 from "../../assets/videos/sample2.mp4";
import sample3 from "../../assets/videos/sample3.mp4";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import {
  closeVideoWindow,
  completeVideo,
  setSelectedVideo,
} from "../../redux/videoSlice";

const CourseVideo = () => {
  // const videoRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedVideo, completion, lastCompleted, allCompleted } = useSelector(
    (state) => state.video
  );
  const { videoRef, videoDetails, watchAgain } = useVideoPlayer();
  const { videoDuration, currentTime, progress, isCompleted } = videoDetails;

  const videoSelector = (num) => {
    dispatch(setSelectedVideo(selectedVideo + num));
  };

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
      {/* <p className={`${isCompleted ? 'completed' : ''}`}>Progress: {isCompleted ? "Completed" : progress+'%'}</p> */}
      <p className="info">
        Please watch the video from start to end without changing the playback
        rate and seeking
      </p>
      {selectedVideo === 1 && (
        <video
          className="video"
          ref={videoRef}
          width="300"
          height="300"
          controls
          controlsList="nodownload noplaybackrate "
        >
          <source src={sample1} type="video/mp4" />
        </video>
      )}
      {selectedVideo === 2 && (
        <video
          className="video"
          ref={videoRef}
          width="300"
          height="300"
          controls
          controlsList="nodownload noplaybackrate "
        >
          <source src={sample2} type="video/mp4" />
        </video>
      )}
      {selectedVideo === 3 && (
        <video
          className="video"
          ref={videoRef}
          width="300"
          height="300"
          controls
          controlsList="nodownload noplaybackrate "
        >
          <source src={sample3} type="video/mp4" />
        </video>
      )}
      {(selectedVideo < 1 || selectedVideo > 3) && (
        <div className="video-not-found">
          <MdReportGmailerrorred size={40} /> <p>Video Not Found</p>
        </div>
      )}
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
        {selectedVideo < 3 ? (
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
      {/* <button onClick={() => dispatch(completeVideo(selectedVideo))}>rdx</button>
      <div>{ String(completion["video"+selectedVideo]) }</div> */}
    </div>
  );
};

export default CourseVideo;
