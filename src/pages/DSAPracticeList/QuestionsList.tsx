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

export type Question = {
  title: string;
  topics: string[];
  difficulty: Difficulty;
  id: number;
};

type QuestionsListProps = {
  questions: Question[];
  isHardTicked: boolean;
  isEasyTicked: boolean;
  isMediumTicked: boolean;
  selectedTopic: string;
};

export default function QuestionsList(props: QuestionsListProps) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [filteredQuestions, setFilteredQuestions] = React.useState<Question[]>(
    []
  );

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

    questions = props.questions.filter((question) => {
      return (
        ((props.isHardTicked && question.difficulty === "hard") ||
          (props.isEasyTicked && question.difficulty === "easy") ||
          (props.isMediumTicked && question.difficulty === "medium")) &&
        (props.selectedTopic == "" ||
          question.topics.includes(props.selectedTopic))
      );
    });

    setFilteredQuestions(questions);
  }, [
    props.isEasyTicked,
    props.isHardTicked,
    props.isMediumTicked,
    props.questions,
    props.selectedTopic,
  ]);

  const createAttempt = async (questionId: number) => {
    const response = await DSAPracticeAPI.createAttempt(questionId);
    console.log(response.assessment_id);
    const assessmentId = response.assessment_id;
    const questionAttemptId = response.questions[0].questions[0];
    navigate(
      `/923011?assessment_id=${assessmentId}&question_id=${questionAttemptId}`
    );
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell align="center">Difficulty</TableCell>
            </TableRow>
          </TableHead>
          {/* <div>{filteredQuestions.length}</div> */}

          <TableBody>
            {filteredQuestions
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
                      i % 2 == 0 ? { backgroundColor: "#EFF6FF" } : {},
                    ]}
                    onClick={() => {
                      createAttempt(question.id);
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {/* {question.id} */}
                      {question.title}
                    </TableCell>
                    <TableCell>{question.topics.toString()}</TableCell>
                    <TableCell align="center">
                      <DifficultyChip difficulty={question.difficulty} />
                      {/* {question.difficulty} */}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={filteredQuestions.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
