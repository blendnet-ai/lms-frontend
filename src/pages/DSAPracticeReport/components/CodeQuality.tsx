import { Box, Skeleton, Typography } from "@mui/material";
import { Card } from "../DSAPracticeReport";
import { icons } from "../../../assets";
import ListElement from "../ListElement";

type CodeQualityProps = {
  score?: number | null;
  code_readability?: string | null;
  variable_naming?: string | null;
  code_structure?: string | null;
  usage_of_comments?: string | null;
};

export default function CodeQuality(props: CodeQualityProps) {
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <img src={icons.mobileProgramming} alt="" />
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
            Code Quality {props.score != null ? `${props.score}/20` : "?/20"}
          </Typography>
          {props.code_readability ? (
            <ListElement
              head="Readability and Best Practices"
              content={props.code_readability}
            />
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={30} />
          )}

          {props.variable_naming ? (
            <ListElement
              head="Variable Naming"
              content={props.variable_naming}
            />
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={30} />
          )}
          {props.code_structure ? (
            <ListElement head="Code Structure" content={props.code_structure} />
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={30} />
          )}
          {props.usage_of_comments ? (
            <ListElement
              head="Usage of Comments"
              content={props.usage_of_comments}
            />
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={30} />
          )}
        </Box>
      </Box>
    </Card>
  );
}
