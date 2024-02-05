import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeVideoWindow, setSelectedVideo } from "../../redux/videoSlice";
import { driver } from "driver.js";
import "./Window.css";
import { QuizDriver, videoDriver } from "../../utils/guides";
import WindowHeader from "./WindowHeader";
import WindowTabs from "./WindowTabs";
import WindowContent from "./WindowContent";
import { setSelectedQuestion } from "../../redux/quizSlice";
import { closeWindow, hideModal } from "../../redux/windowSlice";
import BottomContent from "./BottomContent";
import WindowButtons from "./WindowButtons";
import WarningModal from "../Modal/WarningModal";
import QuizResult from "./QuizResult";

const Window = ({ content, visibility }) => {
  const { lastCompleted, selectedVideo, videos } = useSelector(
    (state) => state.video
  );
  const { selectedQuestion, questions } = useSelector((state) => state.quiz);
  const { isModal, modalProps } = useSelector((state) => state.window);
  const dispatch = useDispatch();
  let properties = {};

  if (content === "quiz") {
    properties = {
      content: content,
      onClose: () => dispatch(closeWindow()),
      onInfoClick: () => driver(QuizDriver).drive(),
      tabs: questions,
      selectedContent: selectedQuestion,
      onSelect: (num) => dispatch(setSelectedQuestion(num)),
    };
  }
  if (content === "video") {
    properties = {
      content: content,
      onClose: () => dispatch(closeWindow()),
      onInfoClick: () => driver(videoDriver).drive(),
      tabs: videos,
      selectedContent: selectedVideo,
      lastCompleted: lastCompleted,
      onSelect: (num) => dispatch(setSelectedVideo(num)),
    };
  }
  if (content === "result") {
    properties = {
      content: content,
      onClose: () => dispatch(closeWindow()),
      onInfoClick: () => driver(videoDriver).drive(),
    };
  }

  return (
    <div className={`window ${visibility ? "slide" : ""}`}>
      {isModal &&
        <WarningModal
          title={modalProps.title}
          description={modalProps.description}
          disabled={modalProps.disabled}
          buttonA={modalProps.buttonA}
          actionA={modalProps.actionA}
          buttonB={modalProps.buttonB}
          actionB={modalProps.actionB}
          // cancel={modalProps.concel}
        />
      }
      <WindowButtons
        content={properties.content}
        onClose={properties.onClose}
        onInfoClick={properties.onInfoClick}
      />
      <WindowHeader
        content={properties.content}
        onClose={properties.onClose}
        onInfoClick={properties.onInfoClick}
      />
      {(content === "video" || content === "quiz") && (
        <div className={`tabs-and-content ${content === "quiz" && "reversed"}`}>
          <WindowTabs
            content={properties.content}
            tabs={properties.tabs}
            selectedContent={properties.selectedContent}
            lastCompleted={properties.lastCompleted}
            onSelect={properties.onSelect}
            />
          <WindowContent content={properties.content} />
        </div>
      )}
      {content === "result" &&
        <QuizResult/>
      }
      <BottomContent />
    </div>
  );
};

export default Window;
