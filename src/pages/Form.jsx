import React, { useState, useReducer, useRef, useEffect } from "react";
import axios from "axios";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./Form.css";
import AiButtons from "../components/Form/AiButtons";
import UploadContainer from "../components/Form/UploadContainer";
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



// const driverObj = driver({
//   showProgress: true,
//   steps: [
//     {
//       element: ".step-title",
//       popover: {
//         title: "Step",
//         description: "You can watch your progress here.",
//         side: "center",
//       }
//     },
//     {
//       element: ".initial-inputs",
//       popover: {
//         title: "Here is the first input fields!",
//         description: "You need to add your 'app name' and 'welcome message'. After that you need to introduce your application in detail in the 'system prompt' section. ",
//         side: "left",
//       }
//     },
//     {
//       element: ".three",
//       popover: {
//         title:"Be careful!",
//         description: "You need to write a text almost like an algorithm.",
//         side: "top",
//       }
//     },
//     {
//       element: ".ai-button-container",
//       popover: {
//         title: "Choose an AI Model.",
//         description: "You can choose the best AI model for your app.",
//         side:"bottom",
//       }
//     },
//     // {
//     //   element: "#first-next-button",
//     //   popover: {
//     //     title: "Next!",
//     //     description: "Click the button to continue other form section.",
//     //     side: "center",
//     //   }
//     // },
//   ]
// });
// driverObj.drive();


// const driverObj2 = driver({
//   showProgress: true,
//   steps: [
//     {
//       element: ".checkbox-container",
//       popover: {
//         title: "Checkboxes!",
//         description: "Don't forget to look at them.",
//         side: "top",
//       }
//     },
//     {
//       element: "#drag-cont",
//       popover: {
//         title: "Drag and Drop your files!",
//         description: "You can add files as many as you want.",
//         side: "top",
//       }
//     },
//     {
//       element: ".pt-container",
//       popover: {
//         title: "Store your conversation and pick your model temperature",
//         description: "Enter the number of days you want the information you entered in this form to be stored and select model temperature with sliding it.",
//         side: "top",
//       }
//     },
//     {
//       popover: {
//         title: "That's All!",
//         description: "Now you can create your application!"
//       }
//     }
//   ]
// });
// driverObj2.drive();



export default function Form() {
  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [aiModals, setAiModals] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useSelector((state) => state.user);
  const stepCount = 2;
  const formRef = useRef(null);
  const driverObj = driver();

  //  AXIOS - GETTING AI MODELS
  const getAiModals = () => {
    axios
      .get("https://localhost:7026/api/models")
      // .get("https://6582f75e02f747c8367abde3.mockapi.io/api/v1/modals")
      .then((res) => setAiModals(res.data))
      .catch((err) => console.error(err.message));
  };


//  TRYING DRIVER IN DIFFERENT STEPS

// useEffect(() => {
//   // Burada driverObj veya driverObj2'yi seçmek için bir şart ekleyin
//   const selectedDriverObj = step === 1 ? driverObj : driverObj2;

//   // driverObj veya driverObj2'yi çalıştırın
//   selectedDriverObj.drive();
// }, [step]);

  useEffect(() => {
    getAiModals();

    
  });

    // OLD TRYING!!!

    // const driverObj = new driver();
    // driverObj.highlight({
    //   showProgress: true,
    //   showButtons: ["next", "previous"],
    //     element: ".step-title",
    //     popover: {
    //       title: "Step",
    //       description: "You can watch your progress here.",
    //       side: "center",
    //     },
    //     element: "#first-next-button",
    //     popover: {
    //       title: "Next!",
    //       description: "Click the button to continue other form section.",
    //       side: "center",
    //     },
    //     element: ".create-button",
    //     popover: {
    //       title: "Create",
    //       description: "If you sure about your information click 'Create'" ,
    //       side: "center",
    //     },
    // });
    // driverObj.drive();

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
      {/* {user.isSignedIn ? ( */}
        <form className="form-container">
          <h2 className="step-title">Step {step}</h2>
          <StepBar step={step} stepCount={stepCount} />

          <div className="bottom">
            <div className="content-container">
              {step === 1 && (
                <div className="step1">
                  <InitialInputs id="inputs"
                    state={state}
                    handleInputChange={handleInputChange}
                  />
                  <AiButtons id="models"
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
              <button id="first-next-button"
                onClick={(e) => handleSteps(e)}
                className={`${step > 1 ? "previous" : ""}`}
              >
                {step > 1 ? "Previous" : "Next"}
              </button>
              {step === 2 && (
                <button class="create-button" onClick={(e) => uploadHandler(e)}>
                  {isCreating ? "Creating..." : "Create"}
                </button>
              )}
            </div>
          </div>
        </form>
       : (
        <div className="login-req-container">
          <div className="login-req-text">Please Sign In</div>
        </div>
      )
    </>
  );
}

// 157. satıra bir süslü parantez ekle. 103. satır ile ilgili.