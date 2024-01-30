import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedVideo } from "../../redux/videoSlice";
import { closeWindow, setWindowContent } from "../../redux/windowSlice";

import { FaPlay } from "react-icons/fa";
import { FaForward, FaBackward } from "react-icons/fa6";
import { FaPenNib } from "react-icons/fa";
import './VideoButtonContainer.css'

const VideoButtonContainer = ({ watchAgain, isHovered }) => {
  const { selectedVideo, lastCompleted, allCompleted, videoCount } = useSelector((state) => state.video);
  const { result } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  let btnProps = {};

  const videoSelector = (num) => dispatch(setSelectedVideo(selectedVideo + num));

  const rightButtonSelector = () => {
    if(selectedVideo < videoCount) {
      btnProps = {
        class: "next",
        onClick: () => videoSelector(1),
        disabled: lastCompleted < selectedVideo,
        text: "Next",
        icon: <FaForward />,
      }
    }
    else if(selectedVideo === videoCount && result !== "passed") {
      btnProps = {
        class: "quiz",
        onClick: () => dispatch(setWindowContent("quiz")),
        disabled: !allCompleted,
        text: "Quiz",
        icon: <FaPenNib />,
      }
    }
    else {
      btnProps = {
        class: "close",
        onClick: () => dispatch(closeWindow()),
        disabled: result !== "passed",
        text: "Close",
        icon: "",
      }
    }
  }
  rightButtonSelector();
  return (
    <div className={`btn-container ${isHovered ? "hovered" : ""}`}>
        <button
          className="btns previous"
          onClick={() => videoSelector(-1)}
          disabled={selectedVideo <= 1}
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
          <span>{ btnProps.text }</span>
          { btnProps.icon }
        </button>
      </div>
  )
}
export default VideoButtonContainer