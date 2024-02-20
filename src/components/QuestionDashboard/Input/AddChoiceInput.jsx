import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChoiceHandler } from '../../redux/updateDBSlice';
import { FaPlus } from 'react-icons/fa6';
import './FancyInput.css';

export const AddChoiceInput = () => {
  const [text, setText] = useState('');
  const { choices } = useSelector((s) => s.updateDB);
  const dispatch = useDispatch();

  const addChoice = () => {
    setText('');
    // const lastID = choices[choices.length-1].oID + 1;
    dispatch(addChoiceHandler(text));
    // const lastID = choices[choices.length-1].oID + 1;
    // setChoices((cur) => ([...cur, {oID: lastID, option: text}]));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addChoice();
  };

  return (
    <div className={`fancy-input add-choice`}>
      <input
        type="text"
        id={'addChoice'}
        value={text}
        onKeyDown={handleKeyPress}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <label htmlFor={'addChoice'}>Add Choice</label>
      <div className="operations">
        <FaPlus onClick={addChoice} className={`btn add`} />
      </div>
    </div>
  );
};
