import { ChoiceInput } from '../Input/ChoiceInput';
import { FaRegCheckCircle, FaRegTrashAlt } from 'react-icons/fa';
import { AddChoiceInput } from '../Input/AddChoiceInput';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChoiceHandler, setAnswer } from '../../redux/updateDBSlice';

export const SingleSelect = () => {
  const { choices, answer } = useSelector(s => s.updateDB);
  const dispatch = useDispatch();

  return (
    <div className="choices-container">
      <AddChoiceInput />
      {choices?.map((c, i) => (
        <ChoiceInput
          key={c.oID}
          label={'Choice ' + (i + 1)}
          choice={c}
        >
          <FaRegCheckCircle
            onClick={() => dispatch(setAnswer(c.oID))}
            className={`btn s-check ${answer === c.oID ? 'selected' : ''}`}
          />
          <FaRegTrashAlt
            onClick={() => dispatch(deleteChoiceHandler(c.oID))}
            className="btn trash"
          />
        </ChoiceInput>
      ))}
    </div>
  );
};
