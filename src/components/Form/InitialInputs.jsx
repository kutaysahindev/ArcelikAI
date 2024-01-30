//Imports
import "./InitialInputs.css";

function InitialInputs({ state, handleInputChange }) {
  return (
    <div className="initial-inputs">
      {/* Step 1 - Text Inputs */}
      <div className="first-two-inp">
        <div className="one">
          <label>App Name</label>
          <input
            id="a-inp"
            className="inputs text-input"
            value={state.appName}
            onChange={(e) => handleInputChange("appName", e.target.value)}
          />
        </div>

        <div className="two">
          <label>Welcome Message</label>
          <input
            id="w-inp"
            className="inputs text-input"
            value={state.welcomeMessage}
            onChange={(e) =>
              handleInputChange("welcomeMessage", e.target.value)
            }
          />
        </div>
      </div>

      <div className="three">
        <label>System Prompt</label>
        <textarea
          id="s-inp"
          className="inputs text-input"
          rows="10"
          value={state.systemPrompt}
          onChange={(e) => handleInputChange("systemPrompt", e.target.value)}
        />
      </div>
    </div>
  );
}

export default InitialInputs;
