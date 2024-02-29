import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedVideo } from "../../redux/videoSlice";
import {
  closeWindow,
  hideModal,
  setModalContext,
  setWindowContent,
} from "../../redux/windowSlice";

import { FaPlay } from "react-icons/fa";
import { FaForward, FaBackward } from "react-icons/fa6";
import { FaPenNib } from "react-icons/fa";
import "./VideoButtonContainer.css";
import WarningModal from "../Modal/WarningModal";
import { useState } from "react";

const VideoButtonContainer = ({ watchAgain, isHovered }) => {
  const [isModal, setIsModal] = useState(false);
  const { selectedVideo, lastCompleted, allCompleted, videoCount } =
    useSelector((state) => state.video);
  const { result } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  let btnProps = {};

  const videoSelector = (num) =>
    dispatch(setSelectedVideo(selectedVideo + num));

  const rightButtonSelector = () => {
    if (selectedVideo < videoCount-1) {
      btnProps = {
        class: "next",
        onClick: () => videoSelector(1),
        disabled: lastCompleted < selectedVideo,
        text: "Next",
        icon: <FaForward />,
      };
    } else if (selectedVideo === videoCount-1 && result !== "passed") {
      btnProps = {
        class: "quiz",
        onClick: showModal,
        disabled: !allCompleted,
        text: "Quiz",
        icon: <FaPenNib />,
      };
    } else {
      btnProps = {
        class: "close",
        onClick: () => dispatch(closeWindow()),
        disabled: result !== "passed",
        text: "Close",
        icon: "",
      };
    }
  };

  const showModal = () => {
    dispatch(
      setModalContext({
        title: "Quiz",
        description: "You're heading to the quiz section. Are you ready?",
        disabled: false,
        buttonA: "Cancel",
        buttonB: "Yes",
        actionA: () => dispatch(hideModal()),
        actionB: () => dispatch(setWindowContent("quiz")),
      })
    );
  };

  rightButtonSelector();
  return (
    <div className={`btn-container ${isHovered ? "hovered" : ""}`}>
      {/* {isModal &&
        <WarningModal
          title={"Quiz"}
          description={"You're heading to the quiz seciton. Are you ready?"}
          cancel={() => setIsModal(false)}
          button={"Yes"}
          action={() => dispatch(setWindowContent("quiz"))}
        />
      } */}
      <button
        className="btns previous"
        onClick={() => videoSelector(-1)}
        disabled={selectedVideo <= 0}
      >
        <FaBackward />
        <span>Previous</span>
      </button>

      <button className="btns again" onClick={watchAgain}>
        <span>Watch Again</span>
        <FaPlay />
      </button>

      <button
        className={"btns " + btnProps.class}
        onClick={btnProps.onClick}
        disabled={btnProps.disabled}
      >
        <span>{btnProps.text}</span>
        {btnProps.icon}
      </button>
    </div>
  );
};
export default VideoButtonContainer;
