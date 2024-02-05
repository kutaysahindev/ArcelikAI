import { IoCloseOutline, IoInformationCircleOutline } from "react-icons/io5";
import { IoIosArrowBack, IoMdSwitch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { hideModal, setModalContext, setWindowContent, toggleWindowContent } from "../../redux/windowSlice";
import { useSelector } from "react-redux";

const WindowButtons = ({ content, onClose, onInfoClick }) => {
  const { allCompleted } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(setModalContext({
      title: "Warning",
      description: "You're leaving the quiz. You will lose your progress and one of two attempts to take the quiz. Are you sure?",
      disabled: false,
      buttonA: "Cancel",
      buttonB: "Leave",
      actionA: () => dispatch(hideModal()),
      actionB: () => dispatch(setWindowContent("video")),
    }))
  }
  return (
    <div className="window-buttons-container">
      {content !== "result" &&
        <>
      
      <button className="w-btn i" onClick={onInfoClick}>
        <IoInformationCircleOutline size={30} />
      </button>
      <button
        className="w-btn i"
        onClick={() => dispatch(toggleWindowContent())}
        >
        <IoMdSwitch size={30} />
      </button>
      {content === "quiz" ? (
        <button className="w-btn x" onClick={showModal}>
          <IoIosArrowBack size={30} />
        </button>
      ) : (
        <button className="w-btn x" onClick={onClose} disabled={!allCompleted}>
          <IoCloseOutline size={30} />
        </button>
      )}
      </>
    }
    </div>
  );
};
export default WindowButtons;
