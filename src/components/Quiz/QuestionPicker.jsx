import { DragAndSortQ } from "./DragAndSortQ";
import { MultiSelectQ } from "./MultiSelectQ";
import { OpenEndedQ } from "./OpenEndedQ";
import { SingleSelectQ } from "./SingleSelectQ";
import { TrueOrFalseQ } from "./TrueOrFalseQ";
import { useSelector } from "react-redux";
import "./Questions.css";

const QuestionPicker = () => {
  const { selectedQuestion, questions } = useSelector((state) => state.quiz);
  const { questionType, question, options } = questions.at(selectedQuestion-1);

  const theQuestion = () => {
    if(questionType === "ss")
    return <SingleSelectQ question={question} options={options}/>
    
    if(questionType === "ms")
    return <MultiSelectQ question={question} options={options}/>

    if(questionType === "das")
    return <DragAndSortQ question={question} options={options}/>

    if(questionType === "oe")
    return <OpenEndedQ question={question}/>

    if(questionType === "tof")
    return <TrueOrFalseQ question={question}/>
  }

  return (
    <>
      { theQuestion() }
    </>
  )
}
export default QuestionPicker