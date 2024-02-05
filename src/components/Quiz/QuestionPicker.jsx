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
import { useEffect } from "react";

const QuestionPicker = () => {
  const { selectedQuestion, questions, responsesToBeSended } = useSelector((state) => state.quiz);
  const user = useSelector((state) => state.user);
  // const { questionType, question, options, Id } = questions.at(selectedQuestion-1);
  const { questionType, question, options, Id } = questions.find((q) => q.Id === selectedQuestion);
  const dispatch = useDispatch();
  let qElement;

  const addResponseHandler = (qID, qType, oID, oIDarr, text, order) => {
    // dispatch(addResponse({Id: qID, oID: oID}));
    // dispatch(addResponse({["Q"+qID]: oID}));
    dispatch(addResponse({key:"Q"+qID, value: oID}));
    dispatch(setResponsesToBeSended({qID, qType, oIDarr, text, order}));
  }

  // useEffect(() => {
  //   console.log('question: ', { questionType, question, options, Id })
  // }, [selectedQuestion])

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "You will lose your progress. Are you sure?";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
  

  const theQuestion = () => {
    if(questionType === "MultipleChoice")
    qElement = <SingleSelectQ id={Id} questionType={"MultipleChoice"} question={question} options={options} addRes={addResponseHandler}/>
    
    if(questionType === "MultipleChoiceAndAnswers")
    qElement = <MultiSelectQ id={Id} questionType={"MultipleChoiceAndAnswers"} question={question} options={options} addRes={addResponseHandler}/>

    if(questionType === "Sorting")
    qElement = <DragAndSortQ id={Id} questionType={"Sorting"} question={question} options={options} addRes={addResponseHandler}/>

    if(questionType === "FillInTheBlank")
    qElement = <OpenEndedQ id={Id} questionType={"FillInTheBlank"} question={question} addRes={addResponseHandler}/>

    if(questionType === "TrueFalse")
    qElement = <TrueOrFalseQ id={Id} questionType={"TrueFalse"} question={question} options={options} addRes={addResponseHandler}/>
  }
  theQuestion();
  return (
    <>
      <TimeBar duration={120}/>
      { qElement }
      {/* <button className="send-button" onClick={sendQuizHandler}>Send</button> */}
    </>
  )
}
export default QuestionPicker