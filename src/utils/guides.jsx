export const formDriver1 = {
  showProgress: true,
  steps: [
    {
      popover: {
        title: "Welcome to Arçelik AI App Wizard",
        description:
          "Initiate your exploration of our platform to optimize your user experience.",
        side: "over",
      },
    },
    {
      element: ".step-title",
      popover: {
        title: "Progress Monitoring",
        description:
          "Track your advancement through the application workflow in this section.",
        side: "center",
      },
    },
    {
      element: ".initial-inputs",
      popover: {
        title: "Initial Input Fields",
        description:
          "Provide essential details such as your 'app name' and 'welcome message.' Additionally, offer a comprehensive introduction to your application in the 'system prompt' section.",
        side: "left",
      },
    },
    {
      element: ".three",
      popover: {
        title: "Attention Required",
        description:
          "Exercise caution while composing text, aiming for an algorithmic structure.",
        side: "top",
      },
    },
    {
      element: ".ai-button-container",
      popover: {
        title: "AI Model Selection",
        description:
          "Optimize your application by choosing the most suitable AI model.",
        side: "bottom",
      },
    },
  ],
};

export const formDriver2 = {
  showProgress: true,
  steps: [
    {
      element: ".checkbox-container",
      popover: {
        title: "Checkboxes",
        description: "Use these checkboxes to enable extra features.",
        side: "top",
      },
    },
    {
      element: ".file-upload",
      popover: {
        title: "File Management",
        description:
          "Effortlessly add files of any quantity through the drag-and-drop feature.",
        side: "top",
      },
    },
    {
      element: ".pt-container",
      popover: {
        title: "Data Storage and Model Configuration",
        description:
          "Specify the duration for storing form data and fine-tune model parameters, including temperature, through intuitive sliders.",
        side: "top",
      },
    },
    {
      popover: {
        title: "Completion",
        description:
          "Congratulations! You have successfully configured your application. Proceed to the next steps.",
      },
    },
  ],
};

export const videoDriver = {
  showProgress: true,
  showButtons: ["next", "previous"],
  steps: [
    {
      element: ".video-section .window",
      popover: {
        title: "🗔 Video Window",
        description:
          "This window guides you on how to create your app. Once you complete it, it will not show up again.",
      },
    },
    {
      element: ".video-tabs",
      popover: {
        title: "🖇 Videos",
        description:
          "You can navigate through the videos here. Remember that you should watch the videos in order",
        // side: "bottom",
        // align: "start",
      },
    },
    {
      element: ".video",
      popover: {
        title: "⏯ Video",
        description:
          "Please watch the each video from start to end without changing the playback rate and seeking",
      },
    },
    {
      element: ".again",
      popover: {
        title: "🔄 Watch Again",
        description: "You can watch again the video by clicking to this button",
      },
    },
    {
      element: ".w-btn.x",
      popover: {
        title: "❌ Close the window",
        description:
          "After finishing all the videos, you can close the dialog. Also, the next button (⏩) will turn into a close button by the end",
      },
    },
    {
      popover: {
        title: "✨That's it ",
        description: "You can now create your custom app",
      },
    },
  ],
};
