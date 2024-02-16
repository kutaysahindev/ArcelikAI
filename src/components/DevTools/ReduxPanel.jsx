import { useDispatch } from 'react-redux';
import './ReduxPanel.css'
import { setResult } from '../../redux/quizSlice';
import { closeWindow, openWindow, setWindowContent } from '../../redux/windowSlice';
import Accordion from './Accordion';
import { useState } from 'react';
import { setAllCompletedFalse, setAllCompletedTrue, setVideoMark } from '../../redux/videoSlice';
import { signUserIn, logUserOut, setNotification } from '../../redux/userSlice';
import DevButton from './DevButton';
import { useSelector } from 'react-redux';
import { packUp } from '../../redux/uploadDBSlice';
import { uploadQuestionDB } from '../../api';

const ReduxPanel = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [input, setInput] = useState({
    videoMarkId: "",
    videoMarkSec: "",
    notificationType: "warning",
    notificationText: "This is a warning",
    notificationTime: 5,
  })
  const { isSignedIn, isTutorialDone, accessToken } = useSelector((slices) => slices.user);
  const { isWindowOpen, windowContent } = useSelector((slices) => slices.window);
  const { videoMark, allCompleted } = useSelector((slices) => slices.video);
  const { result } = useSelector((slices) => slices.quiz);
  const dispatch = useDispatch();
  const expandPanel = () => setIsHovered(true)
  const collapsePanel = () => setIsHovered(false)
  const setText = (fld, txt) => setInput(prev => ({...prev, [fld]: txt}));

  const uploadQue = async () => {
    const quePack = {
      QuestionType: "Sorting",
      QuestionText: "state.question",
      Choices: ["c","b","a"],
      CorrectAnswers : "abc",
    }
    try {
      const response = await uploadQuestionDB(accessToken, quePack);
      console.log('**RESPONSE**: ', response)
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className={`redux-panel ${isHovered ? "expand" : ""}`} onMouseEnter={expandPanel} onMouseLeave={collapsePanel}>
      <div className='accordions'>
        <Accordion title={"Notification"}>
          <input type='text' className='rp-i' value={input.notificationType} onChange={(e) => setText("notificationType", e.target.value)} placeholder='type' />
          <input type='text' className='rp-i' value={input.notificationText} onChange={(e) => setText("notificationText", e.target.value)} placeholder='text' />
          <input type='number' className='rp-i' value={input.notificationTime} onChange={(e) => setText("notificationTime", e.target.value)} placeholder='time' />
          <button className='rp-b' onClick={() => dispatch(setNotification({type:input.notificationType, text:input.notificationText, time:input.notificationTime}))}>Set</button>
        </Accordion>
        <Accordion title={"Auth"}>
          <DevButton txt={"Sign In"} condition={isSignedIn} onClick={() => dispatch(signUserIn())} />
          <DevButton txt={"Log Out"} condition={!isSignedIn} onClick={() => dispatch(logUserOut())} />
        </Accordion>
        <Accordion title={"Window"}>
          <DevButton txt={"Open"} condition={isWindowOpen} onClick={() => dispatch(openWindow())} />
          <DevButton txt={"Close"} condition={!isWindowOpen} onClick={() => dispatch(closeWindow())} />
        </Accordion>
        <Accordion title={"Window Content"}>
          <DevButton txt={"Video"} condition={windowContent === "video"} onClick={() => dispatch(setWindowContent("video"))} />
          <DevButton txt={"Quiz"} condition={windowContent === "quiz"} onClick={() => dispatch(setWindowContent("quiz"))} />
          <DevButton txt={"Result"} condition={windowContent === "result"} onClick={() => dispatch(setWindowContent("result"))} />
        </Accordion>
        <Accordion title={"VideoMark"}>
          <input type='number' className='rp-i' value={input.videoMarkId} onChange={(e) => setText("videoMarkId", e.target.value)} placeholder='id' />
          <input type='number' className='rp-i' value={input.videoMarkSec} onChange={(e) => setText("videoMarkSec", e.target.value)} placeholder='sec' />
          <button className='rp-b' onClick={() => dispatch(setVideoMark({video:input.videoMarkId, time:input.videoMarkSec}))}>Set</button>
          <p>({ videoMark.video ? videoMark.video : "null" }, { videoMark.time ? videoMark.time : "null" })</p>
        </Accordion>
        <Accordion title={"Complete Videos"}>
          <DevButton txt={"Do"} condition={allCompleted} onClick={() => dispatch(setAllCompletedTrue())} />
          <DevButton txt={"Undo"} condition={!allCompleted} onClick={() => dispatch(setAllCompletedFalse())} />
        </Accordion>
        <Accordion title={"Quiz Result"}>
          <DevButton txt={"Undone"} condition={result === "undone"} onClick={() => dispatch(setResult("undone"))} />
          <DevButton txt={"Failed"} condition={result === "failed"} onClick={() => dispatch(setResult("failed"))} />
          <DevButton txt={"Passed"} condition={result === "passed"} onClick={() => dispatch(setResult("passed"))} />
        </Accordion>
        <Accordion title={"Upload to Database"}>
          <DevButton txt={"question"} condition={false} onClick={() => uploadQue()} />
          <DevButton txt={"video"} condition={false} onClick={() => {}} />
        </Accordion>
      </div>
      <h2 className='vertical'>
        {"DEV TOOLS".split('').map((char, index) => (
          <span key={index} className="character">
            {char}
          </span>
        ))}
      </h2>
    </div>
  )
}
export default ReduxPanel