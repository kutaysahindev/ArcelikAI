//Imports
import "./ProgressBar.css";

const FullProgressBar = ({ isCompleted, progress }) => {
  return (
    <div className="full-progress-bar">
      <div
        className="full-progress"
        style={{
          width: `${isCompleted ? 100 : progress}%`,
        }}
      />
    </div>
  );
};
export default FullProgressBar;
