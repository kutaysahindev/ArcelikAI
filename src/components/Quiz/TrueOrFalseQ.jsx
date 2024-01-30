//Imports
import { useState } from "react";
import "./Questions.css";
import { RiListRadio } from "react-icons/ri";
import { useSelector } from "react-redux";

export const TrueOrFalseQ = ({ id, addRes, question }) => {
  const { responses } = useSelector(state => state.quiz);
  const [selection, setSelection] = useState(responses["Q"+id] ? responses["Q"+id] : "");

  const handleOptionSelect = (opt) => {
    setSelection(opt);
    addRes(id, opt);
  }

  return (
    <div className="question true-or-false">
      <RiListRadio size={30} />
      <div>
        <h3 className="title">{question}</h3>
        <ul>
          <li
            className={selection === "true" ? "selected option" : "option"}
            onClick={() => handleOptionSelect("true")}
          >
            True
          </li>
          <li
            className={selection === "false" ? "selected option" : "option"}
<<<<<<< Updated upstream
            onClick={() => handleOptionSelect("false")}
            >
=======
            onClick={() => setSelection("false")}
          >
>>>>>>> Stashed changes
            False
          </li>
        </ul>
      </div>
      {/* <p>selection: { selection }</p> */}
    </div>
  );
};
