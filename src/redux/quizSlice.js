import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../utils/questions";

const initialState = {
  isQuizWindowOpen: true,
  selectedQuestion: 1,
  questions: [],
  responses: {},
  result: "undone" // undone passed failed
}

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
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    addResponse: (state, action) => {
      // state.responses.push(action.payload)
      const { key, value } = action.payload;
      state.responses[key] = value;
    }
  }
});

export const { closeQuizWindow, openQuizWindow, setSelectedQuestion, addResponse, setQuestions } =
  quizSlice.actions;

export default quizSlice.reducer;
