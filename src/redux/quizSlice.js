//Improts
import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../utils/questions";

const initialState = {
  isQuizWindowOpen: true,
  selectedQuestion: 1,
  questions: questions,
<<<<<<< Updated upstream
  responses: {},
  result: "undone" // undone passed failed
}
=======
  result: "undone", // undone passed failed
};
>>>>>>> Stashed changes

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    closeQuizWindow: (state) => {
      state.isQuizWindowOpen = false;
    },
    openQuizWindow: (state) => {
      state.isQuizWindowOpen = true;
    },
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
<<<<<<< Updated upstream
    addResponse: (state, action) => {
      // state.responses.push(action.payload)
      const { key, value } = action.payload;
      state.responses[key] = value;

    }
  }
=======
  },
>>>>>>> Stashed changes
});

export const { closeQuizWindow, openQuizWindow, setSelectedQuestion, addResponse } =
  quizSlice.actions;

export default quizSlice.reducer;
