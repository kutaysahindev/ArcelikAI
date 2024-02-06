import { useState, useReducer, useEffect } from "react";
import "./Form.css";
import AiButtons from "../components/Form/AiButtons";
import UploadContainer from "../components/Form/UploadContainer";
import StepBar from "../components/Form/StepBar";
import CheckBoxContainer from "../components/Form/CheckboxContainer";
import PeriodAndTemperature from "../components/Form/PeriodAndTemperature";
import InitialInputs from "../components/Form/InitialInputs";
import { useDispatch, useSelector } from "react-redux";
import {
  createApp,
  getAiModals,
  postVideoProgress,
  postTutorialProgress,
} from "../api";
import { formDriver1, formDriver2 } from "../utils/guides";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { setAccessToken, setIsTutorialDone } from "../redux/userSlice";
import { useOktaAuth } from "@okta/okta-react";
import Window from "../components/Window/Window";
import FormHeader from "../components/Form/FormHeader";
import { setAllCompletedTrue } from "../redux/videoSlice";

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
  const { isWindowOpen, windowContent } = useSelector((state) => state.window);
  const { isQuizWindowOpen } = useSelector((state) => state.quiz);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const stepCount = 2;
  const { authState, oktaAuth } = useOktaAuth();

  const { LandingUrl } = useSelector((state) => state.settings);

  useEffect(() => {
    if (isWindowOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isWindowOpen]);

  useEffect(() => {
    const postVideo = async () => {
      try {
        await postVideoProgress(user.accessToken, {
          isWatchedAll: true,
          WatchedVideoId: 1,
          WatchedTimeInseconds: 0,
        });
      } catch (error) {
        throw error;
      }
    };
    if (allCompleted && user.accessToken.length > 1) {
      // dispatch(setAllCompletedTrue())
      postVideo();
      console.log("hepsi bitti !!!")
    }
  }, [allCompleted, user.accessToken]);

  useEffect(() => {
    const postTProgress = async () => {
      try {
        await postTutorialProgress(user.accessToken);
      } catch (error) {
        throw error;
      }
    };
    if (!isWindowOpen && user.isTutorialDone !== "second") {
      if (step === 1 && user.isTutorialDone === "none") {
        driver(formDriver1).drive();
        dispatch(setIsTutorialDone("first"));
        postTProgress();
      } else if (step === 2 && user.isTutorialDone === "first") {
        driver(formDriver2).drive();
        dispatch(setIsTutorialDone("second"));
        postTProgress();
      } else return;
    }
  }, [step, isWindowOpen]);

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

    const fd = new FormData();
    fd.append("AppName", state.appName);
    fd.append("WelcomeMessage", state.welcomeMessage);
    fd.append("SystemPrompt", state.systemPrompt);
    fd.append("UseKnowledgebase", state.cb1);
    fd.append("SelectedModel", state.aiModal);
    fd.append("EnableUploadPdfFile", state.cb2);
    fd.append("ConversationRetentionPeriod", state.crPeriod);
    fd.append("ModalTemperature", state.modelTemperature);
    fd.append("Date", user.userInfo.date);
    files.forEach((file) => {
      fd.append("Pdfs", file);
    });

    const sendForm = async (fd, accessToken) => {
      try {
        const response = await createApp(fd, accessToken);
        setIsCreating(response);
        window.location.href = LandingUrl;
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
          <Window content={windowContent} visibility={isWindowOpen} />
          {/* {isWindowOpen && <Window content={windowContent} visiblity={isWindowOpen} />} */}
          <form className="form-container">
            <FormHeader step={step} />
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
