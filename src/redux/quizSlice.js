import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../utils/questions";

const initialState = {
  isQuizWindowOpen: true,
  selectedQuestion: 1,
  questions: questions,
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
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
  }
});

export const { closeQuizWindow, openQuizWindow, setSelectedQuestion } =
  quizSlice.actions;

export default quizSlice.reducer;