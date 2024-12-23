import { Box, CircularProgress } from "@mui/material";
import { Skeleton, Typography } from "@mui/material";

type OverallScoreProps = {
  score?: number | null;
  feedback?: string | null;
};

interface CardProps {
  children: React.ReactNode;
}
const Card = (props: CardProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {props.children}
    </Box>
  );
};

const CustomCircularProgress = ({
  filledValue,
  innerValue,
  innerColor,
  color,
  colorOther,
  textColor,
  circleSize,
}: {
  filledValue: number;
  innerValue: string;
  innerColor: string;
  color: string;
  colorOther: string;
  textColor: string;
  circleSize?: number;
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        thickness={5}
        size={circleSize || 90}
        value={filledValue * 10}
        style={{
          color: color,
          borderRadius: "100px",
          backgroundColor: colorOther,
          scale: "1.15",
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: innerColor,
            width: "100%",
            borderRadius: "100px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "20px",
            color: textColor,
          }}
        >
          {innerValue}
        </div>
      </Box>
    </Box>
  );
};

export default function OverallScore(props: OverallScoreProps) {
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "40px",
        }}
      >
        <Box>
          {props.score != null ? (
            <CustomCircularProgress
              color="#2059EE"
              textColor="#2059EE"
              colorOther="none"
              filledValue={props.score}
              innerValue={`${props.score}/10`}
              innerColor={"none"}
            />
          ) : (
            <Skeleton variant="circular" width={90} height={90} />
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
              fontWeight: "550",
              fontSize: "20px",
            }}
          >
            Performance summary{" "}
            {props.score != null ? `${props.score}/10` : "?/10"}
          </Typography>

          {props.feedback ? (
            <Typography>{props.feedback}</Typography>
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          )}
        </Box>
      </Box>
    </Card>
  );
}
