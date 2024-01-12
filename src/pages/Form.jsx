import { useState, useReducer, useEffect, useRef } from "react";
import axios from "axios";
import "./Form.css";
import AiButtons from "../components/Form/AiButtons";
import UploadContainer from "../components/Form/UploadContainer";
import VideoWindow from "../components/Video/VideoWindow";
import StepBar from "../components/Form/StepBar";
import CheckBoxContainer from "../components/Form/CheckboxContainer";
import PeriodAndTemperature from "../components/Form/PeriodAndTemperature";
import InitialInputs from "../components/Form/InitialInputs";
<<<<<<< HEAD
import { useSelector } from "react-redux";
import { createApp, getAiModals } from "../api";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
=======
import { useDispatch, useSelector } from "react-redux";
import { createApp, getAiModals, postVideoProgress } from "../api";
import { firstDriver, formDriver1, formDriver2 } from "../utils/guides";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { setAccessToken } from "../redux/userSlice";
import { useOktaAuth } from "@okta/okta-react";
>>>>>>> 1e478f51bd820d870f2c4b089ead8ec79b5015bb

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
  const [state, dispatchR] = useReducer(reducer, initialState);
  const { isVideoWindowOpen, allCompleted } = useSelector(
    (state) => state.video
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const stepCount = 2;
<<<<<<< HEAD
    const formRef = useRef(null);
  const driverObj = driver();
  // const { authState, oktaAuth } = useOktaAuth();
=======
  const { authState, oktaAuth } = useOktaAuth();

  useEffect(() => {
    const postVideo = async () => {
      try {
        const videoProg = await postVideoProgress(user.accessToken);
      } catch (error) {
        throw error;
      }
    };
    if (allCompleted) postVideo();
  }, [allCompleted, user.accessToken]);

  useEffect(() => {
    if (!isVideoWindowOpen) {
      if (step === 1) driver(formDriver1).drive();
      if (step === 2) driver(formDriver2).drive();
    }
  }, [step, isVideoWindowOpen]);
>>>>>>> 1e478f51bd820d870f2c4b089ead8ec79b5015bb

  //  AXIOS - GETTING AI MODELS
  // const getAiModals = () => {
  //   axios
  //     .get("https://localhost:7026/api/models")
  //     // .get("https://6582f75e02f747c8367abde3.mockapi.io/api/v1/modals")
  //     .then((res) => setAiModals(res.data))
  //     .catch((err) => console.error(err.message));
  // };

  useEffect(() => {
    if (user.isSignedIn && authState && !user.accessToken) {
      const aT = authState.accessToken.accessToken;
      dispatch(setAccessToken(aT));
    }
    const fetchData = async () => {
      try {
        const models = await getAiModals(user.accessToken);
        setAiModals(models);
      } catch (error) {
        throw error;
      }
    };
    if (user.isSignedIn && user.accessToken) fetchData();
  }, [authState, user.accessToken, user.isSignedIn]);

  useEffect(() => {
      
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          popover: {
            title: "✨ Welcome to Arçelik AI App Wizard!",
            description: "Start exploring our site so we can serve you better.",
            side: "over",
          }
        },
        {
          element: ".step-title",
          popover: {
            title: "Step",
            description: "You can watch your progress here.",
            side: "center",
          }
        },
        {
          element: ".initial-inputs",
          popover: {
            title: "Here is the first input fields!",
            description: "You need to add your 'app name' and 'welcome message'. After that you need to introduce your application in detail in the 'system prompt' section. ",
            side: "left",
          }
        },
        {
          element: ".three",
          popover: {
            title:"❗❗ Be careful!",
            description: "You need to write a text almost like an algorithm.",
            side: "top",
          }
        },
        {
          element: ".ai-button-container",
          popover: {
            title: "🤖 Choose an AI Model",
            description: "You can choose the best AI model for your app.",
            side:"bottom",
          }
        },
        // {
        //   element: "#first-next-button",
        //   popover: {
        //     title: "Next!",
        //     description: "Click the button to continue other form section.",
        //     side: "center",
        //   }
        // },
        {
          element: ".checkbox-container",
          popover: {
            title: "Checkboxes!",
            description: "Don't forget to look at them.👁️",
            side: "top",
          }
        },
        {
          element: "#drag-cont",
          popover: {
            title: "📁 Drag and Drop your files!",
            description: "You can add files as many as you want.",
            side: "top",
          }
        },
        {
          element: ".pt-container",
          popover: {
            title: "Store your conversation and pick your model temperature",
            description: "Enter the number of days you want the information you entered in this form to be stored and select model temperature with sliding it.",
            side: "top",
          }
        },
        {
          popover: {
            title: "🥳 That's All!",
            description: "Now you can create your application! ⏩"
          }
        }
      ]
    });
    driverObj.drive();
  });

  const handleInputChange = (field, value) => {
    dispatchR({ type: "SET_INPUT", field, value });
  };

  const handleSteps = (e) => {
    e.preventDefault();
    if (step > 1) setStep((prev) => prev - 1);
    else setStep((prev) => prev + 1);
  };

  const uploadHandler = async (e) => {
    e.preventDefault();
    // if (files.length === 0 || state.appName === "" || state.aiModal === "") {
    //   alert("No files selected!");
    //   return;
    // }
    const fd = new FormData();
    fd.append("AppName", state.appName);
    fd.append("WelcomeMessage", state.welcomeMessage);
    fd.append("SystemPrompt", state.systemPrompt);
    fd.append("UseKnowledgebase", state.cb1);
    fd.append("SelectedModel", state.aiModal);
    fd.append("EnableUploadPdfFile", state.cb2);
    fd.append("ConversationRetentionPeriod", state.crPeriod);
    fd.append("ModalTemperature", state.modelTemperature);
    fd.append("Email", user.userInfo.email);
    fd.append("Date", user.userInfo.date);
    files.forEach((file) => {
      fd.append("Pdfs", file);
    });

    //  AXIOS - POSTING FORM DATA
    // axios
    //   // .post('https://localhost:7188/api/createapp', fd, {
    //   .post("https://localhost:7026/api/createapp", fd, {
    //     headers: {
    //       "Custom-Header": "value",
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     console.log("res.data: ", res.data);
    //     setIsCreating(true);
    //   })
    //   .catch((err) => console.error(err.message));

    const sendForm = async (fd, accessToken) => {
      try {
        const response = await createApp(fd, accessToken);
        console.log("Response Data:", response.data);
        setIsCreating(response);
      } catch (error) {
        console.log("Error sending form:", error);
      }
    };
    await sendForm(fd, authState?.accessToken.accessToken);
  };

  return (
    <>
      {user.isSignedIn ? (
        <div>
          {isVideoWindowOpen && <VideoWindow />}
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
        </div>
      ) : (
        <div className="login-req-container">
          <div className="login-req-text">Please Sign In</div>
        </div>
      )}
    </>
  );
}