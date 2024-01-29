import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeVideoWindow, setSelectedVideo } from "../../redux/videoSlice";
import { driver } from "driver.js";
import "./Window.css";
import { videoDriver } from "../../utils/guides";
import WindowHeader from "./WindowHeader";
import WindowTabs from "./WindowTabs";
import WindowContent from "./WindowContent";
import { questions } from "../../utils/questions";
import { setSelectedQuestion } from "../../redux/quizSlice";
import { closeWindow } from "../../redux/windowSlice";
import BottomContent from "./BottomContent";
import WindowButtons from "./WindowButtons";

const Window = ({ content }) => {
  const { lastCompleted, selectedVideo, videos } = useSelector(
    (state) => state.video
  );
  const { selectedQuestion } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  let properties = {};

  if (content === "quiz") {
    properties = {
      content: content,
      onClose: () => dispatch(closeWindow()),
      onInfoClick: () => driver(videoDriver).drive(),
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

  return (
    <div className="window">
      <WindowButtons
        onClose={properties.onClose}
        onInfoClick={properties.onInfoClick}
      />
      <WindowHeader
        content={properties.content}
        onClose={properties.onClose}
        onInfoClick={properties.onInfoClick}
      />
      <div className="tabs-and-content">
        <WindowTabs
          content={properties.content}
          tabs={properties.tabs}
          selectedContent={properties.selectedContent}
          lastCompleted={properties.lastCompleted}
          onSelect={properties.onSelect}
        />
        <WindowContent content={properties.content} />
      </div>
      <BottomContent />
    </div>
  );
};

export default Window;
