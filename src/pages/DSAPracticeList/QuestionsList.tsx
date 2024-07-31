import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Chip, TablePagination, Typography } from "@mui/material";
import DSAPracticeAPI from "../../apis/DSAPracticeAPI";
import { useNavigate } from "react-router-dom";
import DifficultyChip, {
  Difficulty,
} from "../../components/DifficultyChip/DifficultyChip";
import { StringUtil } from "../../utils/strings";
import { useDSAPracticeListContext } from "../../hooks/useDSAPracticeListContext";
import { CustomChip } from "./CustomChip";
import LockIcon from "@mui/icons-material/Lock";

export type Question = {
  title: string;
  difficulty: Difficulty;
  topics: string[];
  companies: string[];
  id: number;
  locked: boolean;
};

type QuestionsListProps = {
  questions: Question[];
  difficulty: string[];
  selectedTopic: string;
  selectedCompany: string;
  searchQuery: string;
};

export default function QuestionsList(props: QuestionsListProps) {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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

    questions = props.questions.filter((question) => {
      return (
        ((props.difficulty.includes("hard") &&
          question.difficulty === "hard") ||
          (props.difficulty.includes("easy") &&
            question.difficulty === "easy") ||
          (props.difficulty.includes("medium") &&
            question.difficulty === "medium")) &&
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
    props.difficulty,
    props.questions,
    props.selectedTopic,
    props.selectedCompany,
    props.searchQuery,
    setFilteredQues,
  ]);

  // if there is random question direct start the attempt
  React.useEffect(() => {
    if (randomQuestion && randomQuestion.length > 0) {
      createAttempt(randomQuestion[0].id);
    }
  }, [randomQuestion]);

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
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Topic
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Company
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Difficulty
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          {/* <div>{filteredQuestions.length}</div> */}
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
                  >
                    <TableCell scope="row">{question.id}</TableCell>
                    <TableCell
                      sx={{
                        width: "300px",
                      }}
                    >
                      {question.title}
                    </TableCell>
                    <TableCell>
                      {question.topics
                        .slice(0, 2)
                        .map(StringUtil.convertKebabToTitleCase)
                        .join(", ")}
                      {question.topics.length > 2 ? (
                        <CustomChip
                          chipText={`+ ${question.topics.length - 2} more`}
                          modalContent={
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: "bold",
                                  marginBottom: "10px",
                                }}
                              >
                                Topics Covered
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "5px",
                                }}
                              >
                                {question.topics.map((topic) => (
                                  <Chip
                                    label={StringUtil.convertKebabToTitleCase(
                                      topic
                                    )}
                                    sx={{
                                      marginLeft: "5px",
                                      backgroundColor: "rgb(234, 241, 246)",
                                      color: "black",
                                      borderRadius: "5px",
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          }
                        />
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell>
                      {question.companies
                        .slice(0, 2)
                        .map(StringUtil.convertKebabToTitleCase)
                        .join(", ")}
                      {question.companies.length > 2 ? (
                        <CustomChip
                          chipText={`+ ${question.companies.length - 2} more`}
                          modalContent={
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: "bold",
                                  marginBottom: "10px",
                                }}
                              >
                                Companies Asked
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "5px",
                                }}
                              >
                                {question.companies.map((topic) => (
                                  <Chip
                                    label={StringUtil.convertKebabToTitleCase(
                                      topic
                                    )}
                                    sx={{
                                      marginLeft: "5px",
                                      backgroundColor: "rgb(234, 241, 246)",
                                      color: "black",
                                      borderRadius: "5px",
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          }
                        />
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell>
                      {/* {question.difficulty} */}
                      <DifficultyChip difficulty={question.difficulty} />
                    </TableCell>
                    {/* solve button  */}
                    <TableCell>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          color: "#2059EE",
                          padding: "10px",
                          borderRadius: "5px",
                          cursor: question.locked ? "not-allowed" : "pointer",
                          "&:hover": {
                            backgroundColor: "#2059EE",
                            color: "white",
                          },
                        }}
                        onClick={() => {
                          createAttempt(question.id);
                        }}
                        disabled={question.locked}
                      >
                        {question.locked ? <LockIcon /> : "Solve"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20, 50, 100]}
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
