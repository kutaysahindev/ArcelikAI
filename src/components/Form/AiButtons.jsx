import React, { useState } from "react";
// import axios from "axios";
import "./AiButtons.css";
// import { aiModals } from "./aiModals";

function AiButton({ handleInputChange, aiModals }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (modal) => {
    setSelectedButton(modal.id);
    handleInputChange("aiModal", modal.name);
  };

  return (
    <div className="ai-button-container">
      {!aiModals ? (
        Array(6).fill(1).map(s => (
          <div className='outline skeleton'></div>
        ))
      ) : (
        aiModals.map((modal) => (
          <div
            className={`ai-button ${
              selectedButton === modal.id ? "selected" : ""
            }`}
            key={modal.id}
            onClick={() => handleButtonClick(modal)}
          >
            <h4>{modal.name}</h4>
            <p>{modal.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AiButton;
