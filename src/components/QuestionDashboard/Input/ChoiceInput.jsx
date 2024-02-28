import { useState } from 'react';
import './FancyInput.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateChoiceHandler } from '../../../redux/uploadDBSlice';

export const ChoiceInput = ({
  label,
  choice,
  children,
}) => {
  const [text, setText] = useState(choice.option);
  // const { choices } = useSelector((s) => s.uploadDB);
  const dispatch = useDispatch();
  const lowerLabel = label.toLowerCase();

  const changeChoice = (e) => {
    const pack = e.target.value;
    setText(pack);
    dispatch(updateChoiceHandler({pack: pack, id: choice.oID}))
  };
  return (
    <div className={`fancy-input choice`}>
      <input
        type="text"
        id={lowerLabel}
        value={text}
        onChange={(e) => changeChoice(e)}
        required
      />
      <label htmlFor={lowerLabel}>{label}</label>
      <div className="operations">
        {children}
      </div>
    </div>
  );
};
