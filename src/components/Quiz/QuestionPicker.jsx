import { DragAndSortQ } from "./DragAndSortQ";
import { MultiSelectQ } from "./MultiSelectQ";
import { OpenEndedQ } from "./OpenEndedQ";
import { SingleSelectQ } from "./SingleSelectQ";
import { TrueOrFalseQ } from "./TrueOrFalseQ";
import { useSelector } from "react-redux";
import "./Questions.css";
import { useDispatch } from "react-redux";
import { addResponse, setResponsesToBeSended } from "../../redux/quizSlice";
import TimeBar from "./TimeBar";
import { postQuestionResponses } from "../../api";

const QuestionPicker = () => {
  const { selectedQuestion, questions, responsesToBeSended } = useSelector((state) => state.quiz);
  const user = useSelector((state) => state.user);
  const { questionType, question, options, Id } = questions.at(selectedQuestion-1);
  const dispatch = useDispatch();
  let qElement;

  const addResponseHandler = (qID, qType, oID, oIDarr, text, order) => {
    // dispatch(addResponse({Id: qID, oID: oID}));
    // dispatch(addResponse({["Q"+qID]: oID}));
    dispatch(addResponse({key:"Q"+qID, value: oID}));
    dispatch(setResponsesToBeSended({qID, qType, oIDarr, text, order}));
  }

  const sendQuizHandler = () => {
    const sendQuiz = async () => {
      try {
        await postQuestionResponses(user.accessToken, responsesToBeSended);
        console.log('responsesToBeSended:; ', responsesToBeSended);
      } catch (error) {
        throw error;
      }
    };
    sendQuiz();
  }

  const theQuestion = () => {
    if(questionType === "ss")
    qElement = <SingleSelectQ id={Id} questionType={"ss"} question={question} options={options} addRes={addResponseHandler}/>
    
    if(questionType === "ms")
    qElement = <MultiSelectQ id={Id} questionType={"ms"} question={question} options={options} addRes={addResponseHandler}/>

    if(questionType === "das")
    qElement = <DragAndSortQ id={Id} questionType={"das"} question={question} options={options} addRes={addResponseHandler}/>

    if(questionType === "oe")
    qElement = <OpenEndedQ id={Id} questionType={"oe"} question={question} addRes={addResponseHandler}/>

    if(questionType === "tof")
    qElement = <TrueOrFalseQ id={Id} questionType={"tof"} question={question} options={options} addRes={addResponseHandler}/>
  }
  theQuestion();
  return (
    <>
      <TimeBar duration={120}/>
      { qElement }
      <button className="send-button" onClick={sendQuizHandler}>Send</button>
    </>
  )
}
export default QuestionPicker