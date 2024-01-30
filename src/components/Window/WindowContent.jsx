//Imports
import CourseVideo from "../Video/CourseVideo";
import QuestionPicker from "../Quiz/QuestionPicker";
import { questions } from "../../utils/questions";

const WindowContent = ({ content }) => {
  const contentHandler = () => {
    if (content === "quiz") {
      return <QuestionPicker />;
    }
    if (content === "video") {
      return <CourseVideo />;
    }
  };

  return <div className="content">{contentHandler()}</div>;
};

export default WindowContent;
