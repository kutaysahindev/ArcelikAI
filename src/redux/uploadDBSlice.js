import { createSlice } from '@reduxjs/toolkit';
import { uploadQuestionDB } from '../api';
import { checkQuestionChoiceCount } from '../utils/errorManager';

const initialChoices = [
  {
    oID: 1,
    option: 'First',
  },
  {
    oID: 2,
    option: 'Second',
  },
];

// const asnwerUpload = (state) => {
//   const correctAnswerFormatter = () => {
//   if (state.questionType.value === "MultipleChoice") return [state.answer.option];
//   if (state.questionType.value === "MultipleChoiceAndAnswers") return state.answer.map(a => a.option);
//   if (state.questionType.value === "Sorting") return state.choices.map(a => a.option);
//   if (state.questionType.value === "FillInTheBlank") return [state.answer];
//   if (state.questionType.value === "TrueFalse") return state.answer;
//   }
//   state.quePack = {
//     ...state.quePack,
//     CorrectAnswers : correctAnswerFormatter(),
//   }
// }

const initialState = {
  questionType: { value: 'MultipleChoice', label: 'Single Selection' },
  question: "",
  points: "",
  // addChoiceText: '',
  choices: initialChoices,
  answer: null,
  message: "You can start with chosing the question type",
  errorMessage: null,
  quePack: null,
};

export const uploadDBSlice = createSlice({
  name: 'uploadDB',
  initialState,
  reducers: {
    setQuestionType: (state, action) => {
      const qT = action.payload;
      if(qT.value === "FillInTheBlank") state.choices = null;
      else state.choices = initialChoices;
      state.answer = null;
      state.errorMessage = null;
      state.questionType = qT;
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setChoices: (state, action) => {
      state.choices = action.payload;
    },
    setSortingAnswer: (state, action) => {
      state.answer = action.payload;
    },
    setMultipleAnswer: (state, action) => {
      if (!state.answer) state.answer = [action.payload];
      else if(state.answer.includes(action.payload)) 
        state.answer = state.answer.filter(f => f !== action.payload);
      else state.answer = [...state.answer, action.payload];
    },
    setAnswer: (state, action) => {
      if(state.answer === action.payload) state.answer = null;
      else state.answer = action.payload;
    },
    setTextAnswer: (state, action) => {
      state.answer = action.payload;
    },
    addChoiceHandler: (state, action) => {
      const choiceCount = state.choices.length;
      const lastID = choiceCount < 1 ? 1 : state.choices[choiceCount - 1].oID + 1;
      state.choices = [
        ...state.choices,
        { oID: lastID, option: action.payload },
      ];
    },
    deleteChoiceHandler: (state, action) => {
      state.choices = state.choices.filter((c) => c.oID !== action.payload);
    },
    updateChoiceHandler: (state, action) => {
      const { pack, id } = action.payload
      const arr = [...state.choices]
      const index = arr.findIndex(f => f.oID === id)
      arr[index] = {oID: id, option: pack}
      state.choices = arr;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setQuestionType,
  setQuestion,
  setPoints,
  setChoices,
  setMultipleAnswer,
  setAnswer,
  setTextAnswer,
  setSortingAnswer,
  // setAddChoiceText,
  addChoiceHandler,
  deleteChoiceHandler,
  updateChoiceHandler,
  setErrorMessage,
} = uploadDBSlice.actions;

export default uploadDBSlice.reducer;
