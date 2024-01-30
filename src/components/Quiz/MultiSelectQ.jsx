//Imports
import React, { useState } from "react";
import "./Questions.css";
<<<<<<< Updated upstream
import { RiListCheck3 } from 'react-icons/ri';
import { useSelector } from 'react-redux';
=======
import { RiListCheck3 } from "react-icons/ri";
>>>>>>> Stashed changes

export const MultiSelectQ = ({ id, addRes, question, options }) => {
  const { responses } = useSelector(state => state.quiz);
  const [selectedOptions, setSelectedOptions] = useState(responses["Q"+id] ? responses["Q"+id] : []);

  const handleOptionSelect = (option) => {
    const updatedSelection = [...selectedOptions];
    const selectedIndex = updatedSelection.indexOf(option);
    if (updatedSelection.includes(option))
      updatedSelection.splice(selectedIndex, 1);
    else updatedSelection.push(option);
    setSelectedOptions(updatedSelection);
    addRes(id, updatedSelection)
  };

  return (
    <div className="question multi-select ">
      <RiListCheck3 size={30} />
      <div>
        <h3 className="title">{question}</h3>
        <ul>
<<<<<<< Updated upstream
          {options.map(({oID, option}, index) => (
            <li onClick={() => handleOptionSelect(oID)} key={index} className={selectedOptions.includes(oID) ? 'selected option' : 'option'}>
                <input
                  type="checkbox"
                  onChange={() => handleOptionSelect(oID)}
                  checked={selectedOptions.includes(oID)}
                  />
                <span>{option}</span>
=======
          {options.map(({ oID, option }, index) => (
            <li
              onClick={() => handleOptionSelect(oID)}
              key={index}
              className={
                selectedOptions.includes(oID) ? "selected option" : "option"
              }
            >
              <input type="checkbox" checked={selectedOptions.includes(oID)} />
              <span>{option}</span>
>>>>>>> Stashed changes
            </li>
          ))}
        </ul>
      </div>
      {/* <p>selecteds: { selectedOptions.map(o => <span key={o}>{ o } - </span>) }</p> */}
    </div>
  );
};
