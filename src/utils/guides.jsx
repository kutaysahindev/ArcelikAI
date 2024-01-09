// import { driver } from "driver.js";
// import "driver.js/dist/driver.css";

export const formDriver1 = {
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
    }
  ]
};

export const formDriver2 = {
  showProgress: true,
  steps: [
    {
      element: ".checkbox-container",
      popover: {
        title: "Checkboxes!",
        description: "Don't forget to look at them.👁️",
        side: "top",
      }
    },
    {
      element: ".file-upload",
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
};

// export const formDriver1 = driver({
//   showProgress: true,
//   steps: [
//     {
//       popover: {
//         title: "✨ Welcome to Arçelik AI App Wizard!",
//         description: "Start exploring our site so we can serve you better.",
//         side: "over",
//       }
//     },
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
//         title:"❗❗ Be careful!",
//         description: "You need to write a text almost like an algorithm.",
//         side: "top",
//       }
//     },
//     {
//       element: ".ai-button-container",
//       popover: {
//         title: "🤖 Choose an AI Model",
//         description: "You can choose the best AI model for your app.",
//         side:"bottom",
//       }
//     }
//   ]
// });

// export const formDriver2 = driver({
//   showProgress: true,
//   steps: [
//     {
//       element: ".checkbox-container",
//       popover: {
//         title: "Checkboxes!",
//         description: "Don't forget to look at them.👁️",
//         side: "top",
//       }
//     },
//     {
//       element: "#drag-cont",
//       popover: {
//         title: "📁 Drag and Drop your files!",
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
//         title: "🥳 That's All!",
//         description: "Now you can create your application! ⏩"
//       }
//     }
//   ]
// });
