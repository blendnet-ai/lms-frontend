import {
  Box,
  Button,
  CardMedia,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { StringUtil } from "../../utils/strings";
import { CustomChip } from "../DSAPracticeList/CustomChip";
import DifficultyChip from "../../components/DifficultyChip/DifficultyChip";
import { useEffect, useState } from "react";
import { icons } from "../../assets";
import { useNavigate } from "react-router-dom";
import formatDateTime from "./datFormat";
import DSAPracticeAPI from "../../apis/DSAPracticeAPI";

export default function DSAPracticeHistory() {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const data = await DSAPracticeAPI.getHistory();
    setData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "90vh",
        backgroundColor: "#EFF6FF",
        width: "100%",
      }}
    >
      <Container
        sx={{
          width: "100%",
        }}
      >
        {/* header  */}
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <CardMedia
            component="img"
            image={icons.practiceHistory}
            alt="coding"
            sx={{
              height: "20px",
              width: "20px",
              objectFit: "cover",
            }}
          />

          <Typography
            sx={{
              fontWeight: "bold",
            }}
          >
            Practice History
          </Typography>
        </Box>

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
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  Tag
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  Score
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
            <TableBody>
              {data &&
                data
                  .slice(
                    currentPage * rowsPerPage,
                    currentPage * rowsPerPage + rowsPerPage
                  )
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          fontSize: "1.2rem",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {row.title}
                          </Typography>
                          <Typography>{formatDateTime(row.date)}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {row.tags
                          .slice(0, 2)
                          .map(StringUtil.convertKebabToTitleCase)
                          .join(", ")}
                        {row.tags.length > 2 ? (
                          <CustomChip
                            chipText={`+ ${2} more`}
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
                                  {row.tags.map((tag: string) => (
                                    <Chip
                                      label={StringUtil.convertKebabToTitleCase(
                                        tag
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
                      <TableCell
                        sx={{
                          fontSize: "1.2rem",
                        }}
                      >
                        {row.score}
                      </TableCell>
                      <TableCell>
                        <DifficultyChip difficulty={row.difficulty} />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          sx={{
                            color: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            backgroundColor: "#2059EE",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#2059EE",
                            },
                          }}
                          onClick={() => {
                            navigate(
                              `/dsa-practice-report?assessment_id=${row.assessment_id}`
                            );
                          }}
                        >
                          View Result
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Box>
  );
}
