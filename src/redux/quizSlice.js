import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isQuizWindowOpen: true,
  selectedQuestion: 1,
  questions: [],
  responses: {},
  responsesToBeSended: [],
  result: "undone", // undone passed failed
};

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
      state.responsesToBeSended = action.payload.map((q) => {
        return {
          ReceivedQuestionID: q.Id,
          ReceivedQuestionType: q.questionType,
          ReceivedChoiceID: null,
          ReceivedTextAnswer: null,
          ReceivedSortingOrder: null,
        };
      });
    },
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    quizFailed: (state) => {
      state.result = "failed";
      console.log("quiz failed")
    },
    quizPassed: (state) => {
      state.result = "passed";
      console.log("quiz passed")
    },
    addResponse: (state, action) => {
      const { key, value } = action.payload;
      state.responses[key] = value;
    },
    defaultResponses: (state) => {
      state.responsesToBeSended = state.questions.map((q) => {
        return {
          ReceivedQuestionID: q.QuestionID,
          ReceivedQuestionType: q.QuestionType,
          ReceivedChoiceID: null,
          ReceivedTextAnswer: null,
          ReceivedSortingOrder: null,
        };
      });
    },
    setResponsesToBeSended: (state, action) => {
      const { qID, qType, oIDarr, text, order } = action.payload;
      const index = state.responsesToBeSended.findIndex(
        (q) => q.ReceivedQuestionID === qID
      );
      if (index >= 0) {
        state.responsesToBeSended[index] = {
          ReceivedQuestionID: qID,
          ReceivedQuestionType: qType,
          ReceivedChoiceID: oIDarr,
          ReceivedTextAnswer: text,
          ReceivedSortingOrder: order,
        };
      } 
    },
  },
});

export const {
  closeQuizWindow,
  openQuizWindow,
  setSelectedQuestion,
  addResponse,
  setQuestions,
  setResponsesToBeSended,
  defaultResponses,
  quizFailed,
  quizPassed,
  setResult
} = quizSlice.actions;

export default quizSlice.reducer;
