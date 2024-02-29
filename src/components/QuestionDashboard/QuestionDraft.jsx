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
import { setErrorMessage, setPoints, setQuestion, setQuestionType } from "../../redux/uploadDBSlice";
import { useEffect } from "react";
import { setNotification } from "../../redux/userSlice";
import { checkQuestionDB } from "../../utils/errorManager";
import { uploadQuestionDB } from "../../api";
// import { ErrorDrop } from "../DropNotification/ErrorDrop";

const questionTypes = [
  { value: "MultipleChoice", label: "Single Selection" },
  { value: "MultipleChoiceAndAnswers", label: "Multiple Selection" },
  { value: "Sorting", label: "Sorting" },
  { value: "FillInTheBlank", label: "Open Ended" },
  { value: "TrueFalse", label: "True or False" },
];

export const QuestionDraft = () => {
  const { accessToken, NotificationText } = useSelector((s) => s.user);
  const uploadDB = useSelector((s) => s.uploadDB);
  const { questionType, question, points, errorMessage, quePack, choices, answer } = uploadDB;
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

  const postQuestion = () => {
    const errorMessage = checkQuestionDB(uploadDB);
    if (errorMessage) dispatch(setNotification({type: "error", text: errorMessage}));
    else {
      const correctAnswerFormatter = () => {
        if (questionType.value === "MultipleChoice") return [answer.option];
        if (questionType.value === "MultipleChoiceAndAnswers") return answer.map(a => a.option);
        if (questionType.value === "Sorting") return choices.map(a => a.option);
        if (questionType.value === "FillInTheBlank") return [answer];
        if (questionType.value === "TrueFalse") return answer;
      }
      let queToBeSent = {
        QuestionType: questionType.value,
        QuestionText: question,
        Choices: choices ? choices.map(c => c.option) : null,
        CorrectAnswers : correctAnswerFormatter()
      }
      console.log('queToBeSent: ', queToBeSent)
      const uploadQue = async () => {
        try {
          const response = await uploadQuestionDB(accessToken , queToBeSent);
          console.log('**RESPONSE**: ', response)
          dispatch(setNotification({type: "success", text: "Question has been sent successfully"}));
        } catch (err) {
          console.error(err.message)
          dispatch(setNotification({type: "error", text: err.message}));
        }
      }
      uploadQue();
    }
  }

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

      {/* <p>{ message }</p> */}

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

      <button className="uploadDB-button" onClick={postQuestion} disabled={NotificationText}>Send</button>
    </div>
  );
};
