import { useSelector } from "react-redux";
import { TextInput } from "../Input/TextInput";
import { useDispatch } from "react-redux";
import { setTextAnswer } from "../../redux/updateDBSlice";

export const OpenEnded = () => {
  const { answer } = useSelector((s) => s.updateDB);
  const dispatch = useDispatch();
  return (
    <div>
      <TextInput
        type="text"
        value={answer}
        setValue={(txt) => dispatch(setTextAnswer(txt))}
        label={"Answer"}
      />
    </div>
  );
};
