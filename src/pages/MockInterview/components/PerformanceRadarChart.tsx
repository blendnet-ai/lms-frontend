import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Card } from "./Card";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadarChart,
  Tooltip,
  Radar,
} from "recharts";

type PerformanceScoreProps = {
  total_fluency_score: number | null;
  total_emotion_score: number | null;
  total_coherence_score: number | null;
};

const PerformanceRadarChart = (props: PerformanceScoreProps) => {
  const data = [
    {
      subject: "Fluency",
      A: Math.round(props.total_fluency_score || 0),
      fullMark: 150,
    },
    {
      subject: "Emotion",
      A: Math.round(props.total_emotion_score || 0),
      fullMark: 150,
    },
    {
      subject: "Coherence",
      A: Math.round(props.total_coherence_score || 0),
      fullMark: 150,
    },
  ];

  const tableData = [
    {
      subject: "Fluency",
      score: Math.round(props.total_fluency_score || 0),
    },
    {
      subject: "Emotion",
      score: Math.round(props.total_emotion_score || 0),
    },
    {
      subject: "Coherence",
      score: Math.round(props.total_coherence_score || 0),
    },
  ];
  return (
    <Card
      styles={{
        padding: "0 60px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          // border: "1px solid #EFF6FF",
          gap: "40px",
          padding: "40px 20px",
          border: "1px solid #CFE4FF",
          boxShadow: "0px 4px 4px 0px #00000040",
          borderRadius: "10px",
        }}
      >
        <Box>
          {props.total_fluency_score ||
          props.total_emotion_score ||
          props.total_coherence_score != null ? (
            <RadarChart
              cx={350}
              cy={250}
              outerRadius={200}
              width={700}
              height={400}
              data={data}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Tooltip />
              <Radar
                dataKey="A"
                stroke="#3D6BEF"
                fill="#3D6BEF"
                fillOpacity={0.8}
                width={800}
                height={800}
                dot={{
                  fill: "#FF725E",
                  stroke: "#FF725E",
                  strokeWidth: 4,
                }}
              />
            </RadarChart>
          ) : (
            <Skeleton variant="rectangular" width={700} height={400} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: "#2059EE",
              fontWeight: "600",
              fontSize: "26px",
            }}
          >
            Performance Overview
          </Typography>

          <Typography
            sx={{
              color: "gray",
              fontWeight: "500",
              fontSize: "20px",
              mt: "20px",
            }}
          >
            Percentage Score
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              width: "max-content",
              minWidth: "300px",
            }}
          >
            <Table sx={{}} aria-label="simple table">
              <TableBody>
                {tableData.map((row) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.subject}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {row.score !== null ? `${row.score}%` : "?%"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Card>
  );
};

export default PerformanceRadarChart;
