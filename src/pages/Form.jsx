import { useState, useReducer, useEffect } from "react";
import axios from "axios";
import "./Form.css";
import AiButtons from "../components/Form/AiButtons";
import UploadContainer from "../components/Form/UploadContainer";
import VideoWindow from "../components/Video/VideoWindow";
import StepBar from "../components/Form/StepBar";
import CheckBoxContainer from "../components/Form/CheckboxContainer";
import PeriodAndTemperature from "../components/Form/PeriodAndTemperature";
import InitialInputs from "../components/Form/InitialInputs";
import { useSelector } from "react-redux";

const initialState = {
  appName: "",
  welcomeMessage: "",
  systemPrompt: "",
  aiModal: "",
  cb1: false,
  cb2: false,
  crPeriod: 0,
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
  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [aiModals, setAiModals] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {isVideoWindowOpen} = useSelector((state) => state.video);
  const user = useSelector((state) => state.user);
  const stepCount = 2;

  //  AXIOS - GETTING AI MODELS
  const getAiModals = () => {
    axios
      .get("https://localhost:7026/api/models")
      // .get("https://6582f75e02f747c8367abde3.mockapi.io/api/v1/modals")
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
    if (files.length === 0 || state.appName === "" || state.aiModal === "") {
      alert("No files selected!");
      return;
    }
    const fd = new FormData();
    fd.append("AppName", state.appName);
    fd.append("WelcomeMessage", state.welcomeMessage);
    fd.append("SystemPrompt", state.systemPrompt);
    fd.append("UseKnowledgebase", state.cb1);
    fd.append("SelectedModel", state.aiModal);
    fd.append("EnableUploadPdfFile", state.cb2);
    fd.append("ConversationRetentionPeriod", state.crPeriod);
    fd.append("ModalTemperature", state.modelTemperature);
    fd.append("Username", user.userInfo.name);
    fd.append("Email", user.userInfo.email);
    fd.append("Date", user.userInfo.date);
    files.forEach((file) => {
      fd.append("Pdfs", file);
    });

    //  AXIOS - POSTING FORM DATA
    axios
      // .post('https://localhost:7188/api/createapp', fd, {
      .post("https://localhost:7026/api/createapp", fd, {
        headers: { "Custom-Header": "value" },
      })
      .then((res) => {
        console.log("res.data: ", res.data);
        setIsCreating(true);
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <>
      {user.isSignedIn ? (
        <form className="form-container">
          {isVideoWindowOpen && <VideoWindow />}
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
                  <AiButtons
                    aiModals={aiModals}
                    handleInputChange={handleInputChange}
                  />
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
              <button
                onClick={(e) => handleSteps(e)}
                className={`${step > 1 ? "previous" : ""}`}
              >
                {step > 1 ? "Previous" : "Next"}
              </button>
              {step === 2 && (
                <button onClick={(e) => uploadHandler(e)}>
                  {isCreating ? "Creating..." : "Create"}
                </button>
              )}
            </div>
          </div>
        </form>
      ) : (
        <div className="login-req-container">
          <div className="login-req-text">Please Sign In</div>
        </div>
      )}
    </>
  );
}
