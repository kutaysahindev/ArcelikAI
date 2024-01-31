import React, { useState } from "react";
import "./AiButtons.css";

function AiButton({ handleInputChange, aiModals }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (modal) => {
    setSelectedButton(modal.Id);
    handleInputChange("aiModal", modal.Name);
  };

  // Step 1 - AI model selection
  return (
    <div className="ai-button-container">
      {!aiModals
        ? Array(6)
            .fill(1)
            .map((s, i) => <div key={i} className="outline skeleton"></div>)
        : aiModals.map((modal) => (
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
          ))}
    </div>
  );
}

export default AiButton;
