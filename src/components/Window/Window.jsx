import { useDispatch, useSelector } from "react-redux";
import { closeVideoWindow, setSelectedVideo } from "../../redux/videoSlice";
import { driver } from "driver.js";
import "./Window.css";
import { videoDriver } from "../../utils/guides";
import WindowHeader from "./WindowHeader";
import WindowTabs from "./WindowTabs";
import WindowContent from "./WindowContent";
import {questions} from '../../utils/questions'
import { setSelectedQuestion } from "../../redux/quizSlice";

const Window = ({ content }) => {
  const { lastCompleted, selectedVideo, videos } = useSelector(
    (state) => state.video
  );
  const { selectedQuestion } = useSelector(
    (state) => state.quiz
  );
  const dispatch = useDispatch();

  const handleVideoSelect = (num) => {
    dispatch(setSelectedVideo(num));
  };

  const handleQuestionSelect = (num) => {
    dispatch(setSelectedQuestion(num));
  };

  const handleInfoDriverClick = () => {
    driver(videoDriver).drive();
  };

  const handleCloseVideoWindow = () => {
    dispatch(closeVideoWindow());
  };

  const contentHandler = () => {
    if (content === "quiz"){
      return (
        <>
          <WindowHeader
            content="quiz"
            onClose={handleCloseVideoWindow}
            onInfoClick={handleInfoDriverClick}
          />
          <WindowTabs
            content="quiz"
            tabs={questions}
            selectedContent={selectedQuestion}
            lastCompleted={lastCompleted}
            onSelect={handleQuestionSelect}
          />
          <WindowContent content="quiz" />
        </>
      )
    }
    if (content === "video"){
      return (
        <>
          <WindowHeader
            content="video"
            onClose={handleCloseVideoWindow}
            onInfoClick={handleInfoDriverClick}
          />
          <WindowTabs
            content="video"
            tabs={videos}
            selectedContent={selectedVideo}
            lastCompleted={lastCompleted}
            onSelect={handleVideoSelect}
          />
          <WindowContent content="video" />
        </>
      )
    }
  }

  return (
    <div className="window">
      { contentHandler() }
    </div>
  );
};

export default Window;
