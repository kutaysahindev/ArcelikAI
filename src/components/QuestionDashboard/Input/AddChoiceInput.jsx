import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChoiceHandler } from '../../../redux/uploadDBSlice';
import { FaPlus } from 'react-icons/fa6';
import './FancyInput.css';
import { checkQuestionChoiceCount } from '../../../utils/errorManager';
import { setNotification } from '../../../redux/userSlice';

export const AddChoiceInput = () => {
  const [text, setText] = useState('');
  const { choices } = useSelector((s) => s.uploadDB);
  const dispatch = useDispatch();

  const addChoice = () => {
    const errorMessage = checkQuestionChoiceCount(choices.length);
    if (errorMessage) dispatch(setNotification({type: "error", text: errorMessage}));
    else {
      dispatch(addChoiceHandler(text));
      setText('');
    }
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
        <FaPlus size={16} onClick={addChoice} className={`btn add`} />
      </div>
    </div>
  );
};
