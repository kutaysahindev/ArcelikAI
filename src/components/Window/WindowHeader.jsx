/* eslint-disable react/prop-types */

const WindowHeader = ({ onClose, onInfoClick, content }) => {
  const header = content === "quiz" ? "Quiz" : "Video Course";
  return (
    <div className="head">
<<<<<<< Updated upstream
      {/* <button className="w-btn i" onClick={onInfoClick}>
        <IoInformationCircleOutline size={20} />
      </button> */}
      <h3 className={`title ${content === "quiz" && "reversed"}`}>{ header }</h3>
      {/* <button className="w-btn x" onClick={onClose}>
        <IoCloseOutline size={20} />
      </button> */}
=======
      <h3 className="title">{header}</h3>
>>>>>>> Stashed changes
    </div>
  );
};

export default WindowHeader;
