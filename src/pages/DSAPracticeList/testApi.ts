import DSAPracticeAPI from "../../apis/DSAPracticeAPI";

const test = async () => {
  const data = await DSAPracticeAPI.getQuestions();
  console.log(data);
};

test();
