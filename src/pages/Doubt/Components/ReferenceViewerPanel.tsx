import { Box, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import { Panel } from "react-resizable-panels";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import { DoubtSolvingContext } from "../Context/DoubtContext";
import YouTube, { YouTubeProps } from "react-youtube";
import extractYouTubeId from "../Utils/extractYouTubeId";
import { icons } from "../../../assets";
import CustomTabPanel from "../Helpers/CustomTabPanel";
import { Link } from "react-router-dom";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function ViewerPanel({
  referenceObject,
  isOpen,
  data,
}: {
  referenceObject: any;
  isOpen: boolean;
  data: any;
}) {
  const context = useContext(DoubtSolvingContext);
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.seekTo(referenceObject?.start_seconds, true);
  };

  const opts: YouTubeProps["opts"] = {
    height: "500px",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    console.log("referenceObject", referenceObject);
  }, [referenceObject]);

  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Panel
      style={{
        display: isOpen ? "flex" : "none",
        flexDirection: "column",
        padding: "5px 20px",
        gap: "10px",
      }}
      defaultSize={20}
    >
      {/* close button  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #EFF6FF",
          py: "10px",
        }}
      >
        {data && (
          <Typography
            sx={{
              color: "#2059EE",
              fontWeight: "600",
              fontSize: "1.2rem",
            }}
          >
            Data Structures study material
          </Typography>
        )}
        <Box>
          <IconButton
            onClick={() => {
              context?.setReferenceObject(null);
              context?.setReferenceOpen(false);
            }}
            sx={{}}
          >
            <CloseIcon />
          </IconButton>

          {referenceObject && data && (
            <IconButton
              onClick={() => {
                context?.setReferenceObject(null);
              }}
              sx={{}}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* for pdf  */}
      {referenceObject &&
        referenceObject?.page_label &&
        referenceObject?.page_label !== "null" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <iframe
              key={referenceObject?.page_label}
              src={`${referenceObject?.link}${
                "#page=" + referenceObject?.page_label
              }`}
              width="100%"
              height="100%"
            ></iframe>
          </Box>
        )}

      {/* for video  */}
      {referenceObject &&
        (referenceObject?.start_seconds ||
          referenceObject?.start_seconds === 0) &&
        referenceObject?.start_seconds !== "null" && (
          <YouTube
            videoId={extractYouTubeId(referenceObject?.link)}
            key={referenceObject?.start_seconds}
            opts={opts}
            onReady={onPlayerReady}
          />
        )}

      {/* for data  */}
      {data && !referenceObject && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            overflowY: "auto",
          }}
        >
          {/* header  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              width: "100%",
              pb: "10px",
              borderBottom: "2px solid #EFF6FF",
            }}
          >
            <Tooltip title="Videos">
              <IconButton
                onClick={(event) => {
                  handleChange(event, 0);
                }}
              >
                <VideoLibraryIcon
                  sx={{
                    width: 20,
                    height: 20,
                    color: value === 0 ? "#2059EE" : "#000",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Notes">
              <IconButton
                onClick={(event) => {
                  handleChange(event, 1);
                }}
              >
                <LibraryBooksIcon
                  sx={{
                    width: 20,
                    height: 20,
                    color: value === 1 ? "#2059EE" : "#000",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          {/* videos  */}
          <CustomTabPanel value={value} index={0}>
            {data?.videoResources?.map((video: any) => (
              <Box
                key={video.url}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #EFF6FF",
                  py: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  image={icons.resourceVideo}
                  alt="video-icon"
                  sx={{ width: 20, height: 20 }}
                />
                <Link
                  to=""
                  style={{
                    fontSize: "1rem",
                    fontWeight: "400",
                    color: "#000",
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    context?.setReferenceObject({
                      link: video.url,
                      start_seconds: "0",
                    });
                    context?.setReferenceOpen(true);
                  }}
                >
                  {video.title}
                </Link>
              </Box>
            ))}
          </CustomTabPanel>

          {/* notes  */}
          <CustomTabPanel value={value} index={1}>
            {data?.pdfResources?.map((pdf: any) => (
              <Box
                key={pdf.url}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #EFF6FF",
                  py: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  image={icons.resourcePdf}
                  alt="pdf-icon"
                  sx={{ width: 20, height: 20 }}
                />
                <Link
                  to=""
                  style={{
                    fontSize: "1rem",
                    fontWeight: "400",
                    color: "#000",
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    context?.setReferenceObject({
                      link: pdf.url,
                      page_label: "1",
                    });
                    context?.setReferenceOpen(true);
                  }}
                >
                  {pdf.title}
                </Link>
              </Box>
            ))}
          </CustomTabPanel>
        </Box>
      )}
    </Panel>
  );
}
