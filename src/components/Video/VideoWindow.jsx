import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline, IoInformationCircleOutline } from "react-icons/io5";
import CourseVideo from "./CourseVideo";
import { driver } from "driver.js";
import {
  closeVideoWindow,
  setSelectedVideo,
  fetchVideos,
} from "../../redux/videoSlice";
import "driver.js/dist/driver.css";

import "./VideoWindow.css";
import sample1 from "../../assets/videos/sample1.mp4";
import sample2 from "../../assets/videos/sample2.mp4";
import sample3 from "../../assets/videos/sample3.mp4";
import { videoDriver } from "../../utils/guides";

const VideoWindow = () => {
  const { lastCompleted, selectedVideo, allCompleted } = useSelector(
    (state) => state.video
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);
  const videoSelector = (num) => {
    dispatch(setSelectedVideo(num));
  };

  // useEffect(() => {
  //   driverObj.drive();
  //   //   setTimeout(() => {
  //   //     driverObj.drive();
  //   //   }, 1000);
  // }, [])

  return (
    <div className="video-section">
      <div className="window">
        <div className="head">
          <button
            className="w-btn i"
            onClick={() => driver(videoDriver).drive()}
          >
            <IoInformationCircleOutline size={20} />
          </button>
          <h3 className="title">Video Course</h3>
          <button
            className="w-btn x"
            onClick={() => dispatch(closeVideoWindow())}
            disabled={!allCompleted}
          >
            <IoCloseOutline size={20} />
          </button>
        </div>
        <div className="video-tabs">
          <button
            className={`v-btn ${selectedVideo === 1 ? "selected-video" : ""}`}
            onClick={() => videoSelector(1)}
            disabled={1 > lastCompleted + 1}
          >
            Video 1
          </button>
          <button
            className={`v-btn ${selectedVideo === 2 ? "selected-video" : ""}`}
            onClick={() => videoSelector(2)}
            disabled={2 > lastCompleted + 1}
          >
            Video 2
          </button>
          <button
            className={`v-btn ${selectedVideo === 3 ? "selected-video" : ""}`}
            onClick={() => videoSelector(3)}
            disabled={3 > lastCompleted + 1}
          >
            Video 3
          </button>
        </div>
        <div className="content">
          <CourseVideo />
        </div>
      </div>
    </div>
  );
};
export default VideoWindow;
