import { Box, Button, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { Resource } from "./Modules";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";

type CourseResourceProps = {
  resource: Resource;
  unselectResource: () => void;
};
const CourseResource = (props: CourseResourceProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "20px",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#2059EE",
          }}
        >
          {props.resource.title}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "auto" }}
          onClick={props.unselectResource}
        >
          Back
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          mt: "20px",
        }}
      >
        {/* if resources contain video, show video player */}
        {props.resource.type === "video" && (
          <ReactPlayer
            url={`${import.meta.env.VITE_LMS_BASE_URL}${props.resource.url}`}
            width="60%"
            height="60%"
            controls={true}
          />
        )}

        {/* if resources contain reading, show view link */}
        {props.resource.type === "reading" && (
          <EmbedPDF
            className="editor"
            mode="inline"
            style={{
              width: "100%",
              height: 800,
            }}
            documentURL={`${import.meta.env.VITE_LMS_BASE_URL}${
              props.resource.url
            }`}
          />
        )}
      </Box>
    </Box>
  );
};

export default CourseResource;
