function transformQuestions(data) {
  const { questions } = data;
  const transformedQuestions = [];

  questions.forEach((section) => {
    section.questions.forEach((questionId) => {
      transformedQuestions.push({
        section: section.section,
        question_id: questionId,
      });
    });
  });

  return {
    questions: transformedQuestions,
  };
}

export default transformQuestions;
