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
} from "@mui/material";

interface EngagementProps {
  total_learning_time: number;
  last_login_date: string;
  last_login_time: string;
}

const EngagementStats = (props: EngagementProps) => {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          padding: "20px",
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        Engagement Stats
      </Typography>

      {/* table view of engagement stats */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Last Login Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Last Login Time
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Total Learning Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{props?.last_login_date}</TableCell>
              <TableCell>{props?.last_login_time} PM</TableCell>
              <TableCell>{Math.round(props?.total_learning_time)} Hr</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EngagementStats;
