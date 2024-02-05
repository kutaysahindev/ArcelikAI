import { useState } from "react";
import "./Questions.css";
import { RxInput } from "react-icons/rx";
import { useSelector } from "react-redux";

export const OpenEndedQ = ({ id, questionType, addRes, question }) => {
  const { responses } = useSelector(state => state.quiz);
  const [text, setText] = useState(responses["Q"+id] ? responses["Q"+id] : "");

  const onType = (txt) => {
    setText(txt)
    addRes(id, questionType, txt, null, txt, null)
  }

  return (
    <div className="question open-ended">
      <RxInput size={30} />
      <div>
        <h3 className="title">{question}</h3>
        <input value={text} onChange={(e) => onType(e.target.value)}/>
      </div>
      {/* <p>response: { response }</p> */}
    </div>
  )
}