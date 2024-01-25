/* eslint-disable react/prop-types */

const WindowTabs = ({ videos, selectedVideo, lastCompleted, onSelect }) => {
  return (
    <div className="video-tabs">
      {videos.map((v) => (
        <button
          key={v.Id}
          className={`v-btn ${selectedVideo === v.Id ? "selected-video" : ""}`}
          onClick={() => onSelect(v.Id)}
          disabled={v.Id > lastCompleted + 1}
        >
          Video {v.Id}
        </button>
      ))}
    </div>
  );
};

export default WindowTabs;
