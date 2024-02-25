// I used "rafc + enter" shortcut, it's pretty easy to start to write new component

// import React from 'react';
import './SortedVideo.css';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Visual from "./Visual.jsx";
import {useNavigate} from "react-router-dom";


const SortedVideo = ({ videos }) => {

  // const numbers = [1 , 2, 3, 4, 5];

  const navigate = useNavigate();

  const handleAddNewVideo = () => {
    navigate('/');
  };

  return (
    <div className="selected-video-container">

      <div className='titles'>
        <h1 className="selected-title">Video Order</h1>
        <h2 className='selected-paragraph'>You can change the order in which videos are shown to users..</h2>
      </div>
      {/* <ul>
          {numbers.map((number) => (
          <li key={number}>{number}</li>
          ))}
      </ul> */}
      <div className='video-titles'>
        <SortableContext items={videos} strategy={verticalListSortingStrategy}>
          {videos.map((visual) => (
            <Visual id={visual.id} title={visual.title} key={visual.id} />
          ))}
        </SortableContext>
      </div>
      {/* we'll add an endpoint for that button */}
      <button type='submit' className="apply-btn">Apply Changes</button>
      <div className='btn'>
        <button className='new-video' onClick={handleAddNewVideo}>Create New Video</button>
      </div>
    </div>


  )
}

export default SortedVideo;

