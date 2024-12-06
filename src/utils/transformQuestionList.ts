function transformQuestions(data: { questions: any }) {
  const { questions } = data;
  console.log(questions);
  const transformedQuestions: { section: any; question_id: any }[] = [];

  questions.forEach((section: { questions: any[]; section: any }) => {
    section.questions.forEach((questionId: any) => {
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
