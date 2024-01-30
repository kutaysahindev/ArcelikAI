//Imports
import { IoCloseOutline, IoInformationCircleOutline } from "react-icons/io5";
import { IoMdSwitch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toggleWindowContent } from "../../redux/windowSlice";

const WindowButtons = ({ onClose, onInfoClick }) => {
  const dispatch = useDispatch();
  return (
    <div className="window-buttons-container">
      <button className="w-btn i" onClick={onInfoClick}>
        <IoInformationCircleOutline size={30} />
      </button>
      <button
        className="w-btn i"
        onClick={() => dispatch(toggleWindowContent())}
      >
        <IoMdSwitch size={30} />
      </button>
      <button className="w-btn x" onClick={onClose}>
        <IoCloseOutline size={30} />
      </button>
    </div>
  );
};
export default WindowButtons;
