import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { closeWindow, setWindowContent } from "../../redux/windowSlice";

const QuizResult = () => {
  const { result } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  return (
    <div className="quiz-result">
      <h2 className={`rslt ${result}`}>{ result.toUpperCase() }</h2>
      {result === "failed" ? (
        <div className="msg">
          <p>You have to watch videos more carefully and take the quiz again to be able to create your app.</p>
          <button onClick={() => dispatch(setWindowContent("video"))}>Go back to videos</button>
        </div>
      ) : (
        <div className="msg">
          <p>You have passed the test!</p>
          <button onClick={() => dispatch(closeWindow())}>Create your AI App now</button>
        </div>
      )
      }
    </div>
  )
}
export default QuizResult