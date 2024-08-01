import { Box, CardMedia, Skeleton, Typography } from "@mui/material";
import { Card } from "../DSAPracticeReport";
import { icons } from "../../../assets";
import {
  arrayToNumLines,
  breakText,
} from "../../../components/DSATest/DSATest";

type RevisionTopicsProps = {
  revision_topics?: string | null | string[];
};

export default function RevisionTopics(props: RevisionTopicsProps) {
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
        <CardMedia
          component="img"
          sx={{
            backgroundColor: "#F1E9FB",
            padding: "5px",
            width: "40px",
            height: "40px",
            borderRadius: "5px",
          }}
          src={icons.hourGlass}
        />
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
              color: "#925FE2",
              fontWeight: "550",
              fontSize: "20px",
            }}
          >
            Revision Topics
          </Typography>

          {props.revision_topics ? (
            <Typography>
              {breakText(
                typeof props.revision_topics === "string"
                  ? props.revision_topics
                  : arrayToNumLines(props.revision_topics)
              )}
            </Typography>
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={250} />
          )}
        </Box>
      </Box>
    </Card>
  );
}
