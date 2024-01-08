import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoCloseOutline, IoInformationCircleOutline } from "react-icons/io5";
import CourseVideo from './CourseVideo'
import { driver } from "driver.js";
import { setSelectedVideo } from '../../redux/videoSlice';
import "driver.js/dist/driver.css";

import './VideoWindow.css'
import sample1 from '../../assets/videos/sample1.mp4'
import sample2 from '../../assets/videos/sample2.mp4'
import sample3 from '../../assets/videos/sample3.mp4'

const driverObj = driver({
  showProgress: true,
  showButtons: ["next", "previous"],
  steps: [
    {
      element: ".video-section .window",
      popover: {
        title: "🗔 Video Window",
        description: "This window guides you on how to create your app. Once you complete it, it will not show up again.",
      },
    },
    {
      element: ".video-tabs",
      popover: {
        title: "🖇 Videos",
        description: "You can navigate through the videos here. Remember that you should watch the videos in order",
        // side: "bottom",
        // align: "start",
      },
    },
    {
      element: ".video",
      popover: {
        title: "⏯ Video",
        description:
          "Please watch the each video from start to end without changing the playback rate and seeking",
      },
    },
    {
      element: ".again",
      popover: { title: "🔄 Watch Again", description: "You can watch again the video by clicking to this button" },
    },
    {
      element: ".w-btn.x",
      popover: { title: "❌ Close the window", description: "After finishing all the videos, you can close the dialog. Also, the next button (⏩) will turn into a close button by the end" },
    },
    { popover: { title: "✨That's it ", description: "You can now create your custom app" } },
  ],
});

const VideoWindow = () => {
  const {lastCompleted, selectedVideo} = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const videoSelector = (num) => {
    dispatch(setSelectedVideo(num));
  }
    
  useEffect(() => {
    driverObj.drive();
    //   setTimeout(() => {
    //     driverObj.drive();
    //   }, 1000);
  }, [])
  
  
  return (
    <div className='video-section'>
      <div className='window'>
        <div className='head'>
          <button className='w-btn i' onClick={() => driverObj.drive()}><IoInformationCircleOutline size={20}/></button>
          <h3>Video Course</h3>
          <button className='w-btn x' disabled={(lastCompleted < 3)}><IoCloseOutline size={20}/></button>
        </div>
        <div className='video-tabs'>
          <button className={`v-btn ${selectedVideo === 1 ? "selected-video" : ""}`} onClick={() => videoSelector(1)} disabled={(1 > lastCompleted + 1)}>Video 1</button>
          <button className={`v-btn ${selectedVideo === 2 ? "selected-video" : ""}`} onClick={() => videoSelector(2)} disabled={(2 > lastCompleted + 1)}>Video 2</button>
          <button className={`v-btn ${selectedVideo === 3 ? "selected-video" : ""}`} onClick={() => videoSelector(3)} disabled={(3 > lastCompleted + 1)}>Video 3</button>
        </div>
        <div className='content'>
          <CourseVideo />
        </div>
      </div>
    </div>
  )
}
export default VideoWindow