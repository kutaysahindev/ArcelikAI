import "./PeriodAndTemperature.css";

function PeriodAndTemperature({ state, handleInputChange }) {
  return (
    <div className="pt-container">
      <div className="period-container">
        <label htmlFor="periodInput" className="form-item-title">
          Conversation retention perıod (days)
        </label>
        <input
          type="number"
          id="periodInput"
          value={state.crPeriod}
          onChange={(e) => handleInputChange("crPeriod", e.target.value)}
          min="0"
          max="100"
        />
        {/* <span>{state.crPeriod}</span> */}
      </div>

      <div className="range-container">
        <label htmlFor="rangeInput" className="form-item-title">
          Modal temperature: {Number(state.modelTemperature).toFixed(2)}
        </label>
        <input
          type="range"
          id="rangeInput"
          value={state.modelTemperature}
          onChange={(e) =>
            handleInputChange("modelTemperature", e.target.value)
          }
          min="-1.00"
          max="1.00"
          step="0.05"
        />
      </div>
    </div>
  );
}

export default PeriodAndTemperature;
