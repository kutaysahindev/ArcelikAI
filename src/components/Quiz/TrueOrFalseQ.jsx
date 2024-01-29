import { useState } from "react";
import "./Questions.css";
import { RiListRadio } from "react-icons/ri";

export const TrueOrFalseQ = ({ question }) => {
  const [selection, setSelection] = useState("");
  return (
    <div className="question true-or-false">
      <RiListRadio size={30} />
      <div>
        <h3 className="title">{question}</h3>
        <ul>
          <li
            className={selection === "true" ? "selected option" : "option"}
            onClick={() => setSelection("true")}
          >
            True
          </li>
          <li
            className={selection === "false" ? "selected option" : "option"}
            onClick={() => setSelection("false")}
            >
            False
          </li>
        </ul>
      </div>
      {/* <p>selection: { selection }</p> */}
    </div>
  );
};
