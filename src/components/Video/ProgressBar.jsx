//Imports
import "./ProgressBar.css";

const ProgressBar = ({ isCompleted, progress }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{
          width: `${isCompleted ? 100 : progress}%`,
        }}
      />
    </div>
  );
};
export default ProgressBar;
