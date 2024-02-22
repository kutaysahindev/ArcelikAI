// import React from 'react';
import './SortedVideo.css';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Visual from "./Visual.jsx";


const SortedVideo = ({ videos }) => {
  return (
    <div className="selected-video-container">

      <div className='titles'>
        <h1 className="selected-title">Selected Videos</h1>
        <h2 className='selected-paragraph'>These 5 videos will shown to user.</h2>
      </div>

      <div className='video-titles'>
        <SortableContext items={videos} strategy={verticalListSortingStrategy}>
          {videos.map((visual) => (
            <Visual id={visual.id} title={visual.title} key={visual.id} />
          ))}
        </SortableContext>
      </div>
      <button type='submit' className="edit-btn">Edit</button>
      <div className='btn'>
        <button className='new-video'>Create New Video</button>
      </div>
    </div>


  )
}

export default SortedVideo;

