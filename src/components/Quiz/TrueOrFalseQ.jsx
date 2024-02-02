import { useState } from "react";
import "./Questions.css";
import { RiListRadio } from "react-icons/ri";
import { useSelector } from "react-redux";

export const TrueOrFalseQ = ({ id, questionType, addRes, options, question }) => {
  const { responses } = useSelector(state => state.quiz);
  const [selectedOption, setSelectedOption] = useState(responses["Q"+id]);

  const handleOptionSelect = (opt) => {
    setSelectedOption(opt);
    addRes(id, questionType, opt, null, opt, null);
  }

  return (
    <div className="question true-or-false">
      <RiListRadio size={30} />
      <div>
        <h3 className="title">{question}</h3>
        <ul>
          {options.map(({oID, option}) => (
            <li
            key={oID}
            className={selectedOption === oID ? 'selected option' : 'option'}
            onClick={() => handleOptionSelect(oID)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      {/* <p>selection: { selection }</p> */}
    </div>
  );
};
