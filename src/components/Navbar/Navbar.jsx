import React from "react";
import "./Navbar.css";
import arclk from '../../assets/arcelik_logo_uzun 1.png'

const Navbar = ({ onItemClick }) => {
  return <nav id="navbar">
    <div className="logo">
      <img className='' src={arclk} alt='arcelik' />
    </div>
    <div className="steps">
      <div onClick={() => onItemClick(0)} className='step active'>Home</div>
      <div onClick={() => onItemClick(1)} className='step'>Getting Started</div>
      <div onClick={() => onItemClick(2)} className='step'>Prompt Library</div>
      <div onClick={() => onItemClick(3)} className='step'>Ethics & Security</div>
    </div>
  </nav>;
};

export default Navbar;