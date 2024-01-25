/* eslint-disable react/prop-types */
import { IoCloseOutline, IoInformationCircleOutline } from "react-icons/io5";

const WindowHeader = ({ onClose, onInfoDriverClick }) => {
  return (
    <div className="head">
      <button className="w-btn i" onClick={onInfoDriverClick}>
        <IoInformationCircleOutline size={20} />
      </button>
      <h3 className="title">Video Course</h3>
      <button className="w-btn x" onClick={onClose}>
        <IoCloseOutline size={20} />
      </button>
    </div>
  );
};

export default WindowHeader;
