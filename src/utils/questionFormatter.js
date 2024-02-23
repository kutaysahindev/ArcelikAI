export const questionFormatter = (questions) => {
  const formattedQuiz = questions.map((q) => {
    const newChoices = q.Choices.map((c) => ({
      oID: c.ChoiceID,
      option: c.ChoiceText,
    }));
    return {
      Id: q.QuestionID,
      questionType: q.QuestionType,
      question: q.QuestionText,
      options: newChoices,
    };
  });

  return formattedQuiz;
}