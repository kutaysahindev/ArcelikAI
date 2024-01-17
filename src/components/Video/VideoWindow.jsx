import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline, IoInformationCircleOutline } from "react-icons/io5";
import CourseVideo from "./CourseVideo";
import { driver } from "driver.js";
import { closeVideoWindow, setSelectedVideo, setVideoCount, fetchVideos } from "../../redux/videoSlice";
import "driver.js/dist/driver.css";

import "./VideoWindow.css";
import { videoDriver } from "../../utils/guides";
// import { videos } from "../../utils/videos";

const VideoWindow = () => {
  const { lastCompleted, selectedVideo, allCompleted, videos } = useSelector(
    (state) => state.video
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchVideos());
  }, [dispatch]);
  const videoSelector = (num) => {
    dispatch(setSelectedVideo(num));
  };

  // useEffect(() => {
  //   console.log("first")
  //   // PIN - THIS MUST BE SOMEWHERE ELSE (e.g. Main.jsx)
  //   dispatch(setVideoCount(videos.length));
  //   // if (videoMark.video >= 1) dispatch(setSelectedVideo(videoMark.video))
  // }, [])

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
            disabled={allCompleted}
          >
            <IoCloseOutline size={20} />
          </button>
        </div>
        <div className="video-tabs">
        {videos.map((v) => (
            <button
              key={v.Id}
              className={`v-btn ${selectedVideo === v.Id ? "selected-video" : ""}`}
              onClick={() => videoSelector(v.Id)}
              disabled={v.Id > lastCompleted + 1}
            >
              Video {v.Id}
            </button>
          ))}
        </div>
        <div className="content">
          <CourseVideo />
        </div>
      </div>
    </div>
  );
};
export default VideoWindow;
