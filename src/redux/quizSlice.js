import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../utils/questions";

const initialState = {
  isQuizWindowOpen: true,
  selectedQuestion: 1,
  questions: [],
  responses: {},
  responsesToBeSended: [],
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
    },
    setResponsesToBeSended: (state, action) => {
      const { qID, qType, oIDarr, text, order } = action.payload;
      state.responsesToBeSended[qID-1] = {
        ReceivedQuestionID: qID,
        ReceivedQuestionType: qType,
        ReceivedChoiceID: oIDarr,
        ReceivedTextAnswer: text,
        ReceivedSortingOrder: order,
      };
    }
  }
});

export const { closeQuizWindow, openQuizWindow, setSelectedQuestion, addResponse, setQuestions, setResponsesToBeSended } =
  quizSlice.actions;

export default quizSlice.reducer;
