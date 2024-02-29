// CloudPricing.jsx

import React, { useState } from "react";
import { FaUser, FaChartLine, FaStar } from "react-icons/fa";
import "./CloudPricing.css";

const CloudPricing = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="cloud-pricing-container">
      <div
        className={`cloud-card ${selectedCard === "basic" ? "selected" : ""}`}
        onClick={() => handleSelectCard("basic")}
      >
        <FaUser size={32} color="rgb(230, 69, 69)" />
        <h2>Basic Plan</h2>
        <p>Includes basic features</p>
        <h3>$10/month</h3>
        <button>Select</button>
      </div>
      <div
        className={`cloud-card ${selectedCard === "pro" ? "selected" : ""}`}
        onClick={() => handleSelectCard("pro")}
      >
        <FaChartLine size={32} color="rgb(230, 69, 69)" />
        <h2>Pro Plan</h2>
        <p>Includes advanced features</p>
        <h3>$20/month</h3>
        <button>Select</button>
      </div>
      <div
        className={`cloud-card ${
          selectedCard === "enterprise" ? "selected" : ""
        }`}
        onClick={() => handleSelectCard("enterprise")}
      >
        <FaStar size={32} color="rgb(230, 69, 69)" />
        <h2>Enterprise Plan</h2>
        <p>Customized solutions for your business</p>
        <h3>Contact us</h3>
        <button>Contact</button>
      </div>
    </div>
  );
};

export default CloudPricing;
