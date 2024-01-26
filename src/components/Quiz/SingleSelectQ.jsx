import React, { useState } from 'react';
import "./Questions.css";
import { RiListRadio } from 'react-icons/ri';
import { TbListLetters } from "react-icons/tb";

export const SingleSelectQ = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='question single-select'>
      <TbListLetters size={30} />
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
      {/* <p>selected: { selectedOption }</p> */}
    </div>
  );
};
