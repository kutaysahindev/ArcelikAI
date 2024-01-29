import React, { useState } from 'react';
import "./Questions.css";
import { RiListCheck3 } from 'react-icons/ri';

export const MultiSelectQ = ({ question, options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (option) => {
    const updatedSelection = [...selectedOptions];
    const selectedIndex = updatedSelection.indexOf(option)
    if (updatedSelection.includes(option)) updatedSelection.splice(selectedIndex, 1);
    else updatedSelection.push(option);
    setSelectedOptions(updatedSelection);
  };

  return (
    <div className='question multi-select '>
      <RiListCheck3 size={30} />
      <div>
        <h3 className="title">{question}</h3>
        <ul>
          {options.map(({oID, option}, index) => (
            <li onClick={() => handleOptionSelect(oID)} key={index} className={selectedOptions.includes(oID) ? 'selected option' : 'option'}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(oID)}
                  />
                <span>{option}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* <p>selecteds: { selectedOptions.map(o => <span key={o}>{ o } - </span>) }</p> */}
    </div>
  );
};
