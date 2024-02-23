import { useDispatch } from "react-redux";
import { AddChoiceInput } from "../Input/AddChoiceInput";
import { useSelector } from "react-redux";
import { deleteChoiceHandler, setMultipleAnswer } from "../../redux/updateDBSlice";
import { ChoiceInput } from "../Input/ChoiceInput";
import { FaRegCheckSquare, FaRegTrashAlt } from "react-icons/fa";

export const MultiSelect = () => {
  const { choices, answer } = useSelector(s => s.updateDB);
  const dispatch = useDispatch();

  const deleteChoice = (id) => {
    dispatch(deleteChoiceHandler(id))
  };
  return (
    <div className="choices-container">
      <AddChoiceInput />
      {choices?.map((c, i) => (
        <ChoiceInput
          key={c.oID}
          label={"Choice " + (i + 1)}
          choice={c}
        >
          <FaRegCheckSquare
            onClick={() => dispatch(setMultipleAnswer(c.oID))}
            className={`btn m-check ${answer?.includes(c.oID) ? "selected" : ""}`}
          />
          <FaRegTrashAlt
            onClick={() => deleteChoice(c.oID)}
            className="btn trash"
          />
        </ChoiceInput>
      ))}
    </div>
  );
};
