import { DragAndSortQ } from "./DragAndSortQ";
import { MultiSelectQ } from "./MultiSelectQ";
import { OpenEndedQ } from "./OpenEndedQ";
import { SingleSelectQ } from "./SingleSelectQ";
import { TrueOrFalseQ } from "./TrueOrFalseQ";
import { useSelector } from "react-redux";
import "./Questions.css";
import { useDispatch } from "react-redux";
import { addResponse } from "../../redux/quizSlice";
import TimeBar from "./TimeBar";

const QuestionPicker = () => {
  const { selectedQuestion, questions } = useSelector((state) => state.quiz);
  const { questionType, question, options, Id } = questions.at(selectedQuestion-1);
  const dispatch = useDispatch();
  let qElement;

  const addResponseHandler = (qID, oID) => {
    // dispatch(addResponse({Id: qID, oID: oID}));
    // dispatch(addResponse({["Q"+qID]: oID}));
    dispatch(addResponse({key:"Q"+qID, value: oID}));
  }

  const theQuestion = () => {
    if(questionType === "ss")
    qElement = <SingleSelectQ id={Id} question={question} options={options} addRes={addResponseHandler}/>
    
    if(questionType === "ms")
    qElement = <MultiSelectQ id={Id} question={question} options={options} addRes={addResponseHandler}/>

    if(questionType === "das")
    qElement = <DragAndSortQ id={Id} question={question} options={options} addRes={addResponseHandler}/>

    if(questionType === "oe")
    qElement = <OpenEndedQ id={Id} question={question} addRes={addResponseHandler}/>

    if(questionType === "tof")
    qElement = <TrueOrFalseQ id={Id} question={question} addRes={addResponseHandler}/>
  }
  theQuestion();
  return (
    <>
      <TimeBar duration={15}/>
      { qElement }
    </>
  )
}
export default QuestionPicker