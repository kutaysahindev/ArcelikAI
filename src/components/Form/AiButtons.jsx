import React, { useState } from "react";
import "./AiButtons.css";

function AiButton({ aiModals }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (modal) => {
    setSelectedButton(modal.id);
  };

  return (
    <div className="ai-button-container">
      {aiModals.map((modal) => (
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
      ))}
    </div>
  );
}

export default AiButton;
