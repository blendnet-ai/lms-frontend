import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import BreadCrumb from "../../components/BreadCrumb";
import { useEffect, useState, useMemo, useCallback } from "react";
import LMSAPI, { GetStudentsResponse } from "../../apis/LmsAPI";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/GlobalSearch";
import { useDebounce } from "../../hooks/useDebounce"; // Import the custom hook

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: "/",
  },
];

const Students = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [studentsData, setStudentsData] = useState<GetStudentsResponse | null>(
    null
  );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await LMSAPI.getStudentList();
        setStudentsData(students);
      } catch (error) {
        setError("Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500); // Use the debounce hook
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = useCallback((query: string) => {
    setSearchText(query);
  }, []);

  const handleSearchClick = useCallback(() => {
    setSearchQuery(debouncedSearchText);
  }, [debouncedSearchText]);

  const filteredStudents = useMemo(() => {
    if (!studentsData) return [];
    const query = searchQuery.trim().toLowerCase();
    return studentsData.students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
  }, [studentsData, searchQuery]);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#EFF6FF",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
      }}
    >
      {/* Breadcrumb */}
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Students"}
      />

      {/* Page Title */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        Students
      </Typography>

      {/* Description */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          gap: "20px",
          marginBottom: "20px",
          padding: "10px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "#2059EE",
          }}
        >
          List of all students
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <SearchBar
            query={searchText}
            setQuery={handleSearch}
            onSearch={handleSearchClick}
          />
          <Button variant="contained" onClick={handleSearchClick}>
            Search
          </Button>
        </Box>
      </Box>
      {error && (
        <Typography
          sx={{
            color: "red",
            marginBottom: "20px",
          }}
        >
          {error}
        </Typography>
      )}

      {filteredStudents.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="recordings table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  #
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Course
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Batch ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((row, index) => (
                <TableRow
                  key={row.id} // Use a unique identifier
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    sx={{
                      color: "#2059EE",
                      fontWeight: "bold",
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => {
                      navigate(`/students/${row.id}`);
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>{row.email}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {row.course_title}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {row.batch_id}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        !error && (
          <Typography
            sx={{
              textAlign: "center",
              backgroundColor: "#fff",
              padding: "20px",
              color: "red",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            No Students Found
          </Typography>
        )
      )}
    </Box>
  );
};

export default Students;
