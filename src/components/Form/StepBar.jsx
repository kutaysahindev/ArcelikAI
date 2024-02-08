import "./StepBar.css";

function StepBar({ step, stepCount }) {
  //Step bar at form header
  return (
    <div className="step-bar">
      <div
        className="active-step-bar"
        style={{
          left: `${(step - 1) * (100 / stepCount)}%`,
          width: `${100 / stepCount}%`,
        }}
      ></div>
    </div>
  );
}

export default StepBar;
