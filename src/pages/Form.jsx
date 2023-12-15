import { useState, useReducer } from "react";
import "./Form.css";
import { useOktaAuth } from "@okta/okta-react";
import AiButtons from "../components/Form/AiButtons";
import UploadContainer from "../components/Form/UploadContainer";
import StepBar from "../components/Form/StepBar";
import CheckBoxContainer from "../components/Form/CheckboxContainer";
import PeriodAndTemperature from "../components/Form/PeriodAndTemperature";
import InitialInputs from "../components/Form/InitialInputs";

const aiModals = [
  {
    id: 0,
    name: "GPT-3.5",
    description: "Advanced AI Language Modal",
  },
  {
    id: 1,
    name: "GPT-3.5 - 16K",
    description: "Enhanced, large scale AI Modal",
  },
  {
    id: 2,
    name: "GPT-4",
    description: "Cutting edge AI Modal",
  },
  {
    id: 3,
    name: "GPT-4 Turbo",
    description: "High-speed, advanced AI Modal",
  },
  {
    id: 4,
    name: "Stable Diffusion",
    description: "Innovative AI image generator",
  },
  {
    id: 5,
    name: "LLAMA2",
    description: "Advanced AI Language Modal",
  },
];
const initialState = {
  appName: "",
  welcomeMessage: "",
  systemPrompt: "",
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const stepCount = 2;
  const { authState } = useOktaAuth();

  const handleInputChange = (field, value) => {
    dispatch({ type: "SET_INPUT", field, value });
  };

  const handleInputReset = (e) => {
    e.preventDefault();
    dispatch({ type: "RESET" });
  };

  const handleSteps = (e) => {
    e.preventDefault();
    if (step > 1) setStep((prev) => prev - 1);
    else setStep((prev) => prev + 1);
    // setStep(3);
  };

  // const handleCheckbox = () => {
  //   dispatch({ type: 'SET_INPUT', field, value });
  // };
  // const consoleH = (e) => {
  //   e.preventDefault();
  //   console.log('state: ', state);
  // };

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
              <AiButtons aiModals={aiModals} />
            </div>
          )}

          {step === 2 && (
            <div className="step2">
              <CheckBoxContainer
                state={state}
                handleInputChange={handleInputChange}
              />
              <UploadContainer />
              <PeriodAndTemperature
                state={state}
                handleInputChange={handleInputChange}
              />
            </div>
          )}
        </div>

        <div className="button-container">
          {/* <button onClick={handleInputReset}>reset</button> */}
          <button
            onClick={(e) => handleSteps(e)}
            className={`${step > 1 ? "previous" : ""}`}
          >
            {step > 1 ? "Previous" : "Next"}
          </button>
          {step === 2 && <button onClick={handleInputReset}>Create</button>}
        </div>
      </div>
    </form>
    //   ) : (
    //     <div className="">Not Logged in</div>
    //   )}
    // </div>
  );
}
