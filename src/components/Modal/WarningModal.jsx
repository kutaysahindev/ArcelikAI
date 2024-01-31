import { IoMdClose } from "react-icons/io";
import './WarningModal.css'
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/windowSlice";

const WarningModal = ({ title, description, disabled, buttonA, actionA, buttonB, actionB }) => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(hideModal())
  }
  const both = () => {
    actionB()
    cancel()
  }
  return (
    <div className="warning-modal">
      <div className='context'>
        <button className="x" onClick={cancel} disabled={disabled} >
          <IoMdClose size={14}/>
        </button>
        <h3 className='title'>{ title }</h3>
        <p className='desc'>{ description }</p>
        <div className='btn-cont'>
          <button onClick={actionA} id='cncl'>{ buttonA }</button>
          <button onClick={both} id='actn'>{ buttonB }</button>
        </div>
      </div>
    </div>
  )
}
export default WarningModal