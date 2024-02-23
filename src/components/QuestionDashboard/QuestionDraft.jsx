import "./QuestionDraft.css";
import { Dropdown } from "../Dropdown/Dropdown";
// import { HtmlSelect } from "./Dropdown/HtmlSelect";
import { TextInput } from "./Input/TextInput";
import { OpenEnded } from "./OptionTypes/OpenEnded";
import { TrueOrFalse } from "./OptionTypes/TrueOrFalse";
import { SingleSelect } from "./OptionTypes/SingleSelect";
import { DragAndSort } from "./OptionTypes/DragAndSort";
import { MultiSelect } from "./OptionTypes/MultiSelect";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { packUp, setErrorMessage, setPoints, setQuestion, setQuestionType } from "../../redux/uploadDBSlice";
import { useEffect } from "react";
// import { ErrorDrop } from "../DropNotification/ErrorDrop";

const questionTypes = [
  { value: "MultipleChoice", label: "Single Selection" },
  { value: "MultipleChoiceAndAnswers", label: "Multiple Selection" },
  { value: "Sorting", label: "Sorting" },
  { value: "FillInTheBlank", label: "Open Ended" },
  { value: "TrueFalse", label: "True or False" },
];

export const QuestionDraft = () => {
  const { questionType, question, points, errorMessage, message } = useSelector((s) => s.uploadDB);
  const dispatch = useDispatch();
  let QComponent;

  const componentPicker = () => {
    if (questionType.value === "MultipleChoice") QComponent = <SingleSelect />;
    if (questionType.value === "MultipleChoiceAndAnswers")
      QComponent = <MultiSelect />;
    if (questionType.value === "Sorting") QComponent = <DragAndSort />;
    if (questionType.value === "FillInTheBlank") QComponent = <OpenEnded />;
    if (questionType.value === "TrueFalse") QComponent = <TrueOrFalse />;
  };
  componentPicker();

  useEffect(() => {
    if(errorMessage) {
      setTimeout(() => {
        dispatch(setErrorMessage(""))
      }, 5000);
    }
  }, [errorMessage])
  

  return (
    <div className="question-draft">
      {/* <HtmlSelect questionTypes={questionTypes} /> */}

      {/* <Dropdown questionTypes={questionTypes} z={6}/>
      <Dropdown questionTypes={questionTypes} z={3}/>
      <Dropdown questionTypes={questionTypes} z={0}/> */}

      {/* <TextInput label="Question" />
      <TextInput label="Option" />
      <TextInput label="Points" /> */}

      <p>{ message }</p>

      {/* {errorMessage && <ErrorDrop msg={errorMessage}/>} */}

      <Dropdown
        label="Question Type"
        options={questionTypes}
        selected={questionType}
        selector={(qT) => dispatch(setQuestionType(qT))}
        z={3}
      />

      <TextInput
        type="text"
        label="Question"
        limit={120}
        value={question}
        setValue={(txt) => dispatch(setQuestion(txt))}
      />

      <TextInput
        type="number"
        label="Points"
        max={50}
        value={points}
        setValue={(num) => dispatch(setPoints(num))}
      />
      {QComponent}

      <button className="uploadDB-button" onClick={() => dispatch(packUp())}>Pack Up</button>
    </div>
  );
};
