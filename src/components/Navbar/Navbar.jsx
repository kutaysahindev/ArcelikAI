import React from "react";
import "./Navbar.css";
import arclk from '../../assets/arcelik_logo_uzun 1.png'

const Navbar = ({ onItemClick, selectedIndex }) => {
  return <nav id="navbar">
    <div className="logo">
      <img className='' src={arclk} alt='arcelik' />
    </div>
    <div className="steps">
      <div onClick={() => onItemClick(0)} className={`step ${selectedIndex === 0 ? "active" : ""}`}>Home</div>
      <div onClick={() => onItemClick(1)} className={`step ${selectedIndex === 1 ? "active" : ""}`}>Getting Started</div>
      <div onClick={() => onItemClick(2)} className={`step ${selectedIndex === 2 ? "active" : ""}`}>Prompt Library</div>
      <div onClick={() => onItemClick(3)} className={`step ${selectedIndex === 3 ? "active" : ""}`}>Ethics & Security</div>
    </div>
  </nav>;
};

export default Navbar;