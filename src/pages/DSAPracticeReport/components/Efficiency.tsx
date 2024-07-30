import { Box, Skeleton, Typography } from "@mui/material";
import { Card } from "../DSAPracticeReport";
import { icons } from "../../../assets";

type EfficiencyProps = {
  score?: number | null;
  time_complexity?: string | null;
  space_complexity?: string | null;
  optimum_time_complexity?: string | null;
};

export default function Efficiency(props: EfficiencyProps) {
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "flex-start",
        }}
      >
        <img src={icons.activity} alt="" />
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
            Efficiency {props.score ? `${props.score}/20` : "?/20"}
          </Typography>

          <Box
            sx={{
              width: "100%",
              gap: "4px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {props.time_complexity ? (
              <Typography>Time complexity: {props.time_complexity}</Typography>
            ) : (
              <Skeleton variant="rectangular" width={"100%"} height={25} />
            )}
            {props.optimum_time_complexity ? (
              <Typography>
                Optimum Time Complexity: {props.optimum_time_complexity}{" "}
              </Typography>
            ) : (
              <Skeleton variant="rectangular" width={"100%"} height={25} />
            )}
            {props.space_complexity ? (
              <Typography>
                Space Complexity: {props.space_complexity}{" "}
              </Typography>
            ) : (
              <Skeleton variant="rectangular" width={"100%"} height={25} />
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
