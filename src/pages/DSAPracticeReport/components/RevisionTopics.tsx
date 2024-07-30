import { Box, Skeleton, Typography } from "@mui/material";
import { Card } from "../DSAPracticeReport";
import { icons } from "../../../assets";
import { breakText } from "../../../components/DSATest/DSATest";

type RevisionTopicsProps = {
  revision_topics?: string | null;
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
        <img src={icons.hourGlass} alt="" />
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
            Revision Topics
          </Typography>

          {props.revision_topics ? (
            <Typography>{breakText(props.revision_topics)} </Typography>
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={250} />
          )}
        </Box>
      </Box>
    </Card>
  );
}
