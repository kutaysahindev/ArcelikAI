import React, { useState } from "react";
// import axios from "axios";
import "./AiButtons.css";
// import { aiModals } from "./aiModals";

function AiButton({ handleInputChange, aiModals }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (modal) => {
    setSelectedButton(modal.Id);
    handleInputChange("aiModal", modal.Name);
  };

  return (
    <div className="ai-button-container">
      {!aiModals ? (
        Array(6).fill(1).map((s, i) => (
          <div key={i} className='outline skeleton'></div>
        ))
      ) : (
        aiModals.map((modal) => (
          <div
            className={`ai-button ${
              selectedButton === modal.Id ? "selected" : ""
            }`}
            key={modal.Id}
            onClick={() => handleButtonClick(modal)}
          >
            <h4>{modal.Name}</h4>
            <p>{modal.ShortDescription}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AiButton;
