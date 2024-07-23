import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TablePagination } from "@mui/material";
import DSAPracticeAPI from "../../apis/DSAPracticeAPI";
import { useNavigate } from "react-router-dom";
import DifficultyChip, {
  Difficulty,
} from "../../components/DifficultyChip/DifficultyChip";
import { StringUtil } from "../../utils/strings";
import { useDSAPracticeListContext } from "../../hooks/useDSAPracticeListContext";

export type Question = {
  title: string;
  difficulty: Difficulty;
  topics: string[];
  companies: string[];
  id: number;
};

type QuestionsListProps = {
  questions: Question[];
  isHardTicked: boolean;
  isEasyTicked: boolean;
  isMediumTicked: boolean;
  selectedTopic: string;
  selectedCompany: string;
  searchQuery: string;
};

export default function QuestionsList(props: QuestionsListProps) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(0);

  const { filteredQues, setFilteredQues, randomQuestion } =
    useDSAPracticeListContext();

  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  React.useEffect(() => {
    let questions: Question[] = [];
    console.log(props.searchQuery);

    questions = props.questions.filter((question) => {
      return (
        ((props.isHardTicked && question.difficulty === "hard") ||
          (props.isEasyTicked && question.difficulty === "easy") ||
          (props.isMediumTicked && question.difficulty === "medium")) &&
        (props.selectedTopic === "" ||
          question.topics.includes(props.selectedTopic)) &&
        (props.selectedCompany === "" ||
          question.companies.includes(props.selectedCompany)) &&
        (props.searchQuery === "" ||
          question.title.toLowerCase().includes(props.searchQuery))
      );
    });

    setFilteredQues(questions);
  }, [
    props.isEasyTicked,
    props.isHardTicked,
    props.isMediumTicked,
    props.questions,
    props.selectedTopic,
    props.selectedCompany,
    props.searchQuery,
    setFilteredQues,
  ]);

  const createAttempt = async (questionId: number) => {
    const response = await DSAPracticeAPI.createAttempt(questionId);
    console.log(response.assessment_id);
    const assessmentId = response.assessment_id;
    const questionAttemptId = response.questions[0].questions[0];
    navigate(
      `/dsa-practice?assessment_id=${assessmentId}&question_id=${questionAttemptId}`
    );
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Topic</TableCell>
              {/* <TableCell>Company</TableCell> */}
              <TableCell align="center">Difficulty</TableCell>
            </TableRow>
          </TableHead>
          {/* <div>{filteredQuestions.length}</div> */}
          {randomQuestion && randomQuestion.length > 0 ? (
            <TableBody>
              <TableRow
                sx={[
                  {
                    "&:last-child td, &:last-child th": { border: 0 },
                  },
                ]}
                onClick={() => {
                  createAttempt(randomQuestion[0].id);
                }}
              >
                <TableCell component="th" scope="row">
                  {randomQuestion[0].title}
                </TableCell>
                <TableCell>
                  {randomQuestion[0].topics
                    .map(StringUtil.convertKebabToTitleCase)
                    .join(", ")}
                </TableCell>
                {/* <TableCell>
                  {randomQuestion[0].companies
                    .map(StringUtil.convertKebabToTitleCase)
                    .join(", ")}
                </TableCell> */}
                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DifficultyChip difficulty={randomQuestion[0].difficulty} />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {filteredQues
                .slice(
                  currentPage * rowsPerPage,
                  currentPage * rowsPerPage + rowsPerPage
                )
                .map((question, i) => {
                  // console.log(filteredQuestions.length);
                  return (
                    <TableRow
                      key={question.id}
                      sx={[
                        {
                          "&:last-child td, &:last-child th": { border: 0 },
                        },
                        i % 2 === 0 ? { backgroundColor: "#EFF6FF" } : {},
                      ]}
                      onClick={() => {
                        createAttempt(question.id);
                      }}
                    >
                      <TableCell scope="row">{question.id}</TableCell>
                      <TableCell component="th" scope="row">
                        {/* {question.id} */}
                        {question.title}
                      </TableCell>
                      <TableCell>
                        {question.topics
                          .map(StringUtil.convertKebabToTitleCase)
                          .join(", ")}
                      </TableCell>
                      {/* <TableCell>
                        {question.companies
                          .map(StringUtil.convertKebabToTitleCase)
                          .join(", ")}
                      </TableCell> */}
                      <TableCell
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* {question.difficulty} */}
                        <DifficultyChip difficulty={question.difficulty} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={filteredQues.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
