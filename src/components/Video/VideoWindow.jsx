import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WindowHeader from "./WindowHeader";
import WindowTabs from "./WindowTabs";
import WindowContent from "./WindowContent";
import { closeVideoWindow, setSelectedVideo } from "../../redux/videoSlice";
import { driver } from "driver.js";
import "./VideoWindow.css";
import { videoDriver } from "../../utils/guides";

const VideoWindow = () => {
  const { lastCompleted, selectedVideo, videos } = useSelector(
    (state) => state.video
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchVideos());
  }, [dispatch]);

  const handleVideoSelect = (num) => {
    dispatch(setSelectedVideo(num));
  };

  const handleInfoDriverClick = () => {
    driver(videoDriver).drive();
  };

  const handleCloseVideoWindow = () => {
    dispatch(closeVideoWindow());
  };

  return (
    <div className="video-section">
      <div className="window">
        <WindowHeader
          onClose={handleCloseVideoWindow}
          onInfoClick={handleInfoDriverClick}
          onInfoDriverClick={handleInfoDriverClick}
        />
        <WindowTabs
          videos={videos}
          selectedVideo={selectedVideo}
          lastCompleted={lastCompleted}
          onSelect={handleVideoSelect}
        />
        <WindowContent />
      </div>
    </div>
  );
};

export default VideoWindow;
