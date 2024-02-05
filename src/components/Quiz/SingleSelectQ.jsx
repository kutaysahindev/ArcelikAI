import { useEffect, useState } from 'react';
import "./Questions.css";
import { RiListRadio } from 'react-icons/ri';
import { TbListLetters } from "react-icons/tb";
import { useSelector } from 'react-redux';

export const SingleSelectQ = ({ id, questionType, addRes, question, options }) => {
  const { responses } = useSelector(state => state.quiz)
  const [selectedOption, setSelectedOption] = useState(responses["Q"+id]);

  // useEffect(() => {
  //   console.log('response: ', responses["Q"+id])
  // }, [])

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    addRes(id, questionType, option, [option], null, null);
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
