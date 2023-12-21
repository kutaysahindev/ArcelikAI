import { useState, useReducer, useEffect } from "react";
import axios from "axios";
import "./Form.css";
import { useOktaAuth } from "@okta/okta-react";
import AiButtons from "../components/Form/AiButtons";
import UploadContainer from "../components/Form/UploadContainer";
import StepBar from "../components/Form/StepBar";
import CheckBoxContainer from "../components/Form/CheckboxContainer";
import PeriodAndTemperature from "../components/Form/PeriodAndTemperature";
import InitialInputs from "../components/Form/InitialInputs";


const initialState = {
  appName: "",
  welcomeMessage: "",
  systemPrompt: "",
  aiModal: "",
  cb1: false,
  cb2: false,
  crPeriod: null,
  modelTemperature: 0.5,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default function Form() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [aiModals, setAiModals] = useState(null)
  const [state, dispatch] = useReducer(reducer, initialState);
  const stepCount = 2;
  // const { authState } = useOktaAuth();
  // const [pdfFile, setPdfFile] = useState(null);

  // const [apiStatus, setApiStatus] = useState({
  //   loading: false,
  //   error: null,
  // });
  
  const getAiModals = () => {
    axios
      .get("https://6582f75e02f747c8367abde3.mockapi.io/api/v1/modals")
      // .then((res) => console.log("res.data: ", res.data))
      .then((res) => setAiModals(res.data))
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    getAiModals();
  }, []);

  const handleInputChange = (field, value) => {
    dispatch({ type: "SET_INPUT", field, value });
  };

  const handleSteps = (e) => {
    e.preventDefault();
    if (step > 1) setStep((prev) => prev - 1);
    else setStep((prev) => prev + 1);
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    if (!files) {
      alert('No files selected!');
      return;
    }
    const fd = new FormData();
    fd.append("appName", state.appName)
    fd.append("welcomeMessage", state.welcomeMessage)
    fd.append("systemPrompt", state.systemPrompt)
    fd.append("aiModal", state.aiModal)
    fd.append("cb1", state.cb1)
    fd.append("cb2", state.cb2)
    fd.append("crPeriod", state.crPeriod)
    fd.append("modelTemperature", state.modelTemperature)
    files.forEach((f,i) => fd.append(`file${i + 1}`, f));

    axios
      .post('http://httpbin.org/post', fd, {
        headers: { 'Custom-Header': 'value' },
      })
      .then((res) => console.log('res.data: ', res.data))
      .catch((err) => console.error(err.message));
  };

  return (
    // <div className="">
    //   {authState.isAuthenticated ? (
    <form className="form-container">
      <h2 className="step-title">Step {step}</h2>
      <StepBar step={step} stepCount={stepCount} />

      <div className="bottom">
        <div className="content-container">
          {step === 1 && (
            <div className="step1">
              <InitialInputs
                state={state}
                handleInputChange={handleInputChange}
              />
              <AiButtons aiModals={aiModals} handleInputChange={handleInputChange} />
            </div>
          )}

              {step === 2 && (
                <div className="step2">
                  <CheckBoxContainer
                    state={state}
                    handleInputChange={handleInputChange}
                  />
                  <UploadContainer files={files} setFiles={setFiles} />
                  <PeriodAndTemperature
                    state={state}
                    handleInputChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            <div className="button-container">
              {/* <button onClick={handleInputReset}>reset</button> */}
              {/* <button onClick={e => getAiModals(e)}>GET</button> */}
              <button
                onClick={(e) => handleSteps(e)}
                className={`${step > 1 ? "previous" : ""}`}
              >
                {step > 1 ? "Previous" : "Next"}
              </button>
              {step === 2 && <button onClick={e => uploadHandler(e)}>Create</button>}
            </div>
          </div>
        </form>
    //   ) : (
    //     <div className="">Not Logged in</div>
    //   )}
    // </div>
  );
}
