import { useDispatch } from 'react-redux';
import './ReduxPanel.css'
import { setResult } from '../../redux/quizSlice';
import { closeWindow, openWindow, setWindowContent } from '../../redux/windowSlice';
import Accordion from './Accordion';
import { useState } from 'react';
import { setAllCompletedFalse, setAllCompletedTrue } from '../../redux/videoSlice';
const ReduxPanel = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [input, setInput] = useState({
    videoMarkId: "",
    videoMarkSec: "",
    videoMarkew: "",
    videoMarker: "",
  })
  const dispatch = useDispatch();
  const expandPanel = () => setIsHovered(true)
  const collapsePanel = () => setIsHovered(false)
  const setText = (fld, txt) => setInput(prev => ({...prev, [fld]: txt}));

  return (
    <div className={`redux-panel ${isHovered ? "expand" : ""}`} onMouseEnter={expandPanel} onMouseLeave={collapsePanel}>
      <div className='accordions'>
        <Accordion title={"Window"}>
          <button className='rp-b' onClick={() => dispatch(openWindow())}>Open</button>
          <button className='rp-b' onClick={() => dispatch(closeWindow())}>Close</button>
        </Accordion>
        <Accordion title={"Window Content"}>
          <button className='rp-b' onClick={() => dispatch(setWindowContent("video"))}>Video</button>
          <button className='rp-b' onClick={() => dispatch(setWindowContent("quiz"))}>Quiz</button>
          <button className='rp-b' onClick={() => dispatch(setWindowContent("result"))}>Result</button>
        </Accordion>
        <Accordion title={"Quiz Result"}>
          <button className='rp-b' onClick={() => dispatch(setResult("undone"))}>Undone</button>
          <button className='rp-b' onClick={() => dispatch(setResult("failed"))}>Failed</button>
          <button className='rp-b' onClick={() => dispatch(setResult("Passed"))}>Passed</button>
        </Accordion>
        <Accordion title={"VideoMark"}>
          <input type='number' className='rp-i' value={input.videoMarkId} onChange={(e) => setText("videoMarkId", e.target.value)} placeholder='id' />
          <input type='number' className='rp-i' value={input.videoMarkSec} onChange={(e) => setText("videoMarkSec", e.target.value)} placeholder='sec' />
          <button className='rp-b' onClick={() => {}}>Send</button>
        </Accordion>
        <Accordion title={"Complete Videos"}>
          <button className='rp-b' onClick={() => dispatch(setAllCompletedTrue())}>Do</button>
          <button className='rp-b' onClick={() => dispatch(setAllCompletedFalse())}>Undo</button>
        </Accordion>
      </div>
      <h2 className='vertical'>
        {"DEV TOOLS".split('').map((char, index) => (
          <span key={index} className="character">
            {char}
          </span>
        ))}
      </h2>
      {/* <div className='quiz-result'>
        <h3 onClick={}>Window Content</h3>
        <div className='btn-grp'>
          <button onClick={() => dispatch(setWindowContent("video"))}>Video</button>
          <button onClick={() => dispatch(setWindowContent("quiz"))}>Quiz</button>
          <button onClick={() => dispatch(setWindowContent("result"))}>Result</button>
        </div>
      </div>
      <div className='quiz-result'>
        <h3 onClick={}>Quiz Result</h3>
        <div className='btn-grp'>
          <button onClick={() => dispatch(setResult("undone"))}>Undone</button>
          <button onClick={() => dispatch(setResult("failed"))}>Failed</button>
          <button onClick={() => dispatch(setResult("Passed"))}>Passed</button>
        </div>
      </div> */}
    </div>
  )
}
export default ReduxPanel