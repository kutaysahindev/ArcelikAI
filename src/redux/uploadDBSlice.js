import { createSlice } from '@reduxjs/toolkit';
import { uploadQuestionDB } from '../api';

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
      if(qT.value === "TrueFalse" || qT.value === "FillInTheBlank") state.choices = null;
      else state.choices = initialChoices;
      // state.answer = action.payload === "MultipleChoiceAndAnswers" ? [] : "";
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
      if(choiceCount > 5) {
        state.errorMessage = "You can't add more than 6 choices"
        return;
      }
      const lastID = choiceCount < 1 ? 1 : state.choices[choiceCount - 1].oID + 1;
      state.choices = [
        ...state.choices,
        { oID: lastID, option: action.payload },
      ];
      // state.addChoiceText = '';
    },
    deleteChoiceHandler: (state, action) => {
      state.choices = state.choices.filter((c) => c.oID !== action.payload);
    },
    updateChoiceHandler: (state, action) => {
      const { pack, id } = action.payload
      // const arr = [...choices]
      // const index = choices.findIndex(f => f.oID === id)
      // arr[index] = {oID: id, option: pack}
      // setChoices(arr)
      const arr = [...state.choices]
      const index = arr.findIndex(f => f.oID === id)
      arr[index] = {oID: id, option: pack}
      state.choices = arr;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    packUp: (state) => {
      const qT = state.questionType.value;
      const cC = state.choices.length;
      const choiceTxts = state.choices.map(c => c.option)
      // console.log('choiceTxts: ', choiceTxts)
      const cSet = new Set(choiceTxts)
      const hasSameChoice = Boolean(cSet.size < choiceTxts.length)
      const hasChoices = !(qT === "TrueFalse" || qT === "FillInTheBlank")
      const isAnyEmpty = hasChoices ? Boolean(state.choices.find(m => m.option === "")) : false;
      if (!state.question) state.errorMessage = "Question input must have valid text";
      else if (state.question.length < 10) state.errorMessage = "Question input must have more than 10 characters";
      else if (state.points < 1 || state.points > 50) state.errorMessage = "Points should be between 1 and 50";
      else if (hasChoices && isAnyEmpty) state.errorMessage = "Choices cannot be left empty";
      else if(hasSameChoice) state.errorMessage = "There cannot be more than one identical option"
      else if (hasChoices && cC < 3) state.errorMessage = "The number of choices should be larger than " + cC;
      else if (!state.answer) state.errorMessage = "You cannot upload a question without setting an answer";
      else {
        // state.quePack = {
        //   QuestionType: state.questionType,
        //   QuestionText: state.question,
        //   Choices: state.choices,
        //   CorrectAnswers : state.answer,
        // }
        state.quePack = {
          QuestionType: "Sorting",
          QuestionText: "state.question",
          Choices: ["c","b","a"],
          CorrectAnswers : "abc",
        }
        // const uploadQue = async () => {
        //   try {
        //     const response = await uploadQuestionDB(,state.quePack);
        //     console.log('**RESPONSE**: ', response)
        //   } catch (err) {
        //     console.error(err.message)
        //   }
        // }
        // uploadQue();
      }
      // console.log('state.quePack: ', state.quePack)
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
  // setAddChoiceText,
  addChoiceHandler,
  deleteChoiceHandler,
  updateChoiceHandler,
  setErrorMessage,
  packUp,
} = uploadDBSlice.actions;

export default uploadDBSlice.reducer;
