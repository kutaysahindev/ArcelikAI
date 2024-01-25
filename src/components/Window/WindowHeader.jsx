/* eslint-disable react/prop-types */
import { IoCloseOutline, IoInformationCircleOutline } from "react-icons/io5";

const WindowHeader = ({ onClose, onInfoClick, content }) => {
  const header = content === "quiz" ? "Quiz" : "Video Course"
  return (
    <div className="head">
      <button className="w-btn i" onClick={onInfoClick}>
        <IoInformationCircleOutline size={20} />
      </button>
      <h3 className="title">{ header }</h3>
      <button className="w-btn x" onClick={onClose}>
        <IoCloseOutline size={20} />
      </button>
    </div>
  );
};

export default WindowHeader;
