import { useEffect, useState } from "react";
import './TimeBar.css'
import { hideModal, setModalContext, setWindowContent } from "../../redux/windowSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { postQuestionResponses } from "../../api";

const TimeBar = ({ duration }) => {
  const [time, setTime] = useState(duration);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { responses, responsesToBeSended } = useSelector(state => state.quiz);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  useEffect(() => {
    if (isPaused) return
    console.log("first")
    const flow = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : prev));
      // setTime(prev => prev>0 ? prev-1 : prev);
      // if (time > 0) console.log('time: ', time)
    }, 1000);
    return () => clearInterval(flow);
  }, []);

  const timeFormatter = (time) => {
    return time < 10 ? `0${time}` : time;
  }

  const sendQuizHandler = () => {
    const sendQuiz = async () => {
      try {
        await postQuestionResponses(user.accessToken, responsesToBeSended);
        console.log('responsesToBeSended:; ', responsesToBeSended);
      } catch (error) {
        throw error;
      }
    };
    sendQuiz();
  }

  const showModal = () => {
    dispatch(setModalContext({
      title: "Time Is Up",
      description: "Your time is up. If you choose to leave, you lose one attempt of two. Do you want to send your answers?",
      disabled: true,
      buttonA: "Leave",
      actionA: () => {
        dispatch(hideModal())
        dispatch(setWindowContent("video"))
      },
      buttonB: "Send",
      actionB: sendQuizHandler,
      // actionB: () => console.log("Quiz was sent"),
      // actionB: () => setIsPaused(true),
    }))
  }

  useEffect(() => {
    if (time === 0) showModal();
  }, [time])
  

  return (
    <div
      className={`time-bar ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="time"
        style={{ width: (time / duration) * 100 + "%", transition: "300ms" }}
      >
      </div>
      <p className="text">{ timeFormatter(hours) } : { timeFormatter(minutes) } : { timeFormatter(seconds) }</p>
    </div>
  );
};
export default TimeBar;
