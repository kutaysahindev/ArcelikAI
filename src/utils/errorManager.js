
export const checkQuestionDB = (state) => {
  const qT = state.questionType.value;
  const hasChoices = !(qT === "TrueFalse" || qT === "FillInTheBlank")
  const cC = hasChoices && state.choices.length;
  const choiceTxts = hasChoices && state.choices.map(c => c.option)
  // console.log('choiceTxts: ', choiceTxts)
  const cSet = hasChoices && new Set(choiceTxts)
  const hasSameChoice = hasChoices && Boolean(cSet.size < choiceTxts.length)
  const isAnyEmpty = hasChoices && Boolean(state.choices.find(m => m.option === ""));

  if (!state.question) return "Question input must have valid text";
  if (state.question.length < 10) return "Question input must have more than 10 characters";
  if (state.points < 1 || state.points > 50) return "Points should be between 1 and 50";
  if (hasChoices && isAnyEmpty) return "Choices cannot be left empty";
  if (hasSameChoice) return "There cannot be more than one identical option";
  if (hasChoices && cC < 3) return "The number of choices should be larger than " + cC;
  if (!state.answer) return "You cannot upload a question without setting an answer";
  else return null; // No errors
};

export const checkQuestionChoiceCount = (choiceCount) => {
  if(choiceCount > 5) return "You can't add more than 6 choices";
  else return null
}