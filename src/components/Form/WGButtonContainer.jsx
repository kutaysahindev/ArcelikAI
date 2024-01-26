import { PiVideoBold } from "react-icons/pi";
import { IoInformationCircleOutline } from "react-icons/io5";
import './WGButtonContainer.css'
import { useDispatch } from "react-redux";
import { closeWindow, openWindow } from "../../redux/windowSlice";
import { formDriver1, formDriver2 } from "../../utils/guides";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const WGButtonContainer = ({ step }) => {
  const dispatch = useDispatch();
  const GuideSelector = () => {
    if (step === 1) driver(formDriver1).drive();
    if (step === 2) driver(formDriver2).drive();
  }
  return (
    <div className="wg-button-container">
      <IoInformationCircleOutline size={20} onClick={GuideSelector} />
      <PiVideoBold onClick={() => dispatch(openWindow())} size={20} />
    </div>
  )
}
export default WGButtonContainer