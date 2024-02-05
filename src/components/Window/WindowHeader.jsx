/* eslint-disable react/prop-types */
// import { IoCloseOutline, IoInformationCircleOutline } from "react-icons/io5";

const WindowHeader = ({ onClose, onInfoClick, content }) => {
  const header = content === "quiz" ? "Quiz" : content === "video" ? "Video Course" : "Result";
  return (
    <div className="head">
      {/* <button className="w-btn i" onClick={onInfoClick}>
        <IoInformationCircleOutline size={20} />
      </button> */}
      <h3 style={{textAlign: content === "result" && "center"}} className={`title ${content === "quiz" && "reversed"}`}>{ header }</h3>
      {/* <button className="w-btn x" onClick={onClose}>
        <IoCloseOutline size={20} />
      </button> */}
    </div>
  );
};

export default WindowHeader;
