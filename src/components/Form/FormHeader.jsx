import { useDispatch } from "react-redux";
import { openWindow, setWindowContent } from "../../redux/windowSlice";
import { GoVideo } from "react-icons/go";
import { IoInformationCircleOutline } from "react-icons/io5";
import { formDriver1, formDriver2 } from "../../utils/guides";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const FormHeader = ({ step }) => {
  const dispatch = useDispatch();
  const GuideSelector = () => {
    if (step === 1) driver(formDriver1).drive();
    if (step === 2) driver(formDriver2).drive();
  }
  const openWindowVideo = () => {
    dispatch(setWindowContent("video"))
    dispatch(openWindow())
  }
  return (
    <div className="step-title">
      <IoInformationCircleOutline className="header-btn" size={20} onClick={GuideSelector} />
      <h2>Step {step}</h2>
      <GoVideo className="header-btn" size={20} onClick={openWindowVideo} />
    </div>
  )
}
export default FormHeader