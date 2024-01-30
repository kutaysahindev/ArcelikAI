//Imports
import { useState } from "react";
import "./Questions.css";
import { RxInput } from "react-icons/rx";
import { useSelector } from "react-redux";

export const OpenEndedQ = ({ id, addRes, question }) => {
  const { responses } = useSelector(state => state.quiz);
  const [text, setText] = useState(responses["Q"+id] ? responses["Q"+id] : "");

  const onType = (txt) => {
    setText(txt)
    addRes(id, txt)
  }

  return (
    <div className="question open-ended">
      <RxInput size={30} />
      <div>
        <h3 className="title">{question}</h3>
<<<<<<< Updated upstream
        <input value={text} onChange={(e) => onType(e.target.value)}/>
=======
        <input onChange={(e) => setResponse(e.target.value)} />
>>>>>>> Stashed changes
      </div>
      {/* <p>response: { response }</p> */}
    </div>
  );
};
