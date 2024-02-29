// import React from 'react';
import "./Visual.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import sorted from "../Assets/sorted.png";
import { CiTextAlignJustify } from "react-icons/ci";

const Visual = ({id, title}) => {
  const {attributes, listeners, setNodeRef,
     transform, transition} = useSortable({id});

//  Const style provides us to move elements 
// but when we let go they are gonna go back to their old place.
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };


  return (
    <div ref={setNodeRef} {...attributes} 
    {...listeners} style={style} className='visual-videos'>
      {/* <input type="checkbox" className="checkbox"/> */}
      {title}
      {/* after switched react-icons no need the img tags */}
      {/* <img src={sorted} className='sorted-img'></img>  */}
      <CiTextAlignJustify className='sorted-img' />
      </div>
  )
}

export default Visual;
