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

const Window = ({ content }) => {
  const { lastCompleted, selectedVideo, videos } = useSelector(
    (state) => state.video
  );
  const { selectedQuestion } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  let properties = {};

  // const handleVideoSelect = (num) => {
  //   dispatch(setSelectedVideo(num));
  // };

  // const handleQuestionSelect = (num) => {
  //   dispatch(setSelectedQuestion(num));
  // };
  // const handleQuestionSelect = (num) => {
  //   dispatch(setSelectedQuestion(num));
  // };

  // const handleInfoDriverClick = () => {
  //   driver(videoDriver).drive();
  // };
  // const handleInfoDriverClick = () => {
  //   driver(videoDriver).drive();
  // };

  // const handleCloseVideoWindow = () => {
  //   dispatch(closeVideoWindow());
  // };
  // const handleCloseVideoWindow = () => {
  //   dispatch(closeVideoWindow());
  // };

  // const contentHandler = () => {
  //   if (content === "quiz"){
  //     return (
  //       <>
  //         <WindowHeader
  //           content="quiz"
  //           onClose={handleCloseVideoWindow}
  //           onInfoClick={handleInfoDriverClick}
  //         />
  //         <WindowTabs
  //           content="quiz"
  //           tabs={questions}
  //           selectedContent={selectedQuestion}
  //           lastCompleted={lastCompleted}
  //           onSelect={handleQuestionSelect}
  //         />
  //         <WindowContent content="quiz" />
  //       </>
  //     )
  //   }
  //   if (content === "video"){
  //     return (
  //       <>
  //         <WindowHeader
  //           content="video"
  //           onClose={handleCloseVideoWindow}
  //           onInfoClick={handleInfoDriverClick}
  //         />
  //         <WindowTabs
  //           content="video"
  //           tabs={videos}
  //           selectedContent={selectedVideo}
  //           lastCompleted={lastCompleted}
  //           onSelect={handleVideoSelect}
  //         />
  //         <WindowContent content="video" />
  //       </>
  //     )
  //   }
  // }
  // const contentHandler = () => {
  //   if (content === "quiz"){
  //     return (
  //       <>
  //         <WindowHeader
  //           content="quiz"
  //           onClose={handleCloseVideoWindow}
  //           onInfoClick={handleInfoDriverClick}
  //         />
  //         <WindowTabs
  //           content="quiz"
  //           tabs={questions}
  //           selectedContent={selectedQuestion}
  //           lastCompleted={lastCompleted}
  //           onSelect={handleQuestionSelect}
  //         />
  //         <WindowContent content="quiz" />
  //       </>
  //     )
  //   }
  //   if (content === "video"){
  //     return (
  //       <>
  //         <WindowHeader
  //           content="video"
  //           onClose={handleCloseVideoWindow}
  //           onInfoClick={handleInfoDriverClick}
  //         />
  //         <WindowTabs
  //           content="video"
  //           tabs={videos}
  //           selectedContent={selectedVideo}
  //           lastCompleted={lastCompleted}
  //           onSelect={handleVideoSelect}
  //         />
  //         <WindowContent content="video" />
  //       </>
  //     )
  //   }
  // }

  if (content === "quiz") {
    properties = {
      content: content,
      onClose: () => dispatch(closeWindow()),
      onInfoClick: () => driver(videoDriver).drive(),
      tabs: questions,
      selectedContent: selectedQuestion,
      onSelect: (num) => dispatch(setSelectedQuestion(num))
    }
  }
  if (content === "video") {
    properties = {
      content: content,
      onClose: () => dispatch(closeWindow()),
      onInfoClick: () => driver(videoDriver).drive(),
      tabs: videos,
      selectedContent: selectedVideo,
      lastCompleted: lastCompleted,
      onSelect: (num) => dispatch(setSelectedVideo(num))
    }
  }

  // return (
  //   <div className="window">
  //     { contentHandler() }
  //   </div>
  // );
  return (
    <div className="window">
      <WindowHeader
        content={properties.content}
        onClose={properties.onClose}
        onInfoClick={properties.onInfoClick}
      />
      <div className="tab-content">
        <WindowTabs
          content={properties.content}
          tabs={properties.tabs}
          selectedContent={properties.selectedContent}
          lastCompleted={properties.lastCompleted}
          onSelect={properties.onSelect}
        />
        <WindowContent content={properties.content} />
      </div>
    </div>
  );
};

export default Window;
