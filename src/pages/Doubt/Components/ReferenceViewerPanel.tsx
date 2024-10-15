import { Box, IconButton } from "@mui/material";
import { Panel } from "react-resizable-panels";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect } from "react";
import { DoubtSolvingContext } from "../Context/DoubtContext";
import YouTube, { YouTubeProps } from "react-youtube";
import extractYouTubeId from "../Utils/extractYouTubeId";

export default function ViewerPanel({
  referenceObject,
  isOpen,
}: {
  referenceObject: any;
  isOpen: boolean;
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={() => {
            context?.setReferenceOpen(false);
            context?.setReferenceObject(null);
          }}
          sx={{}}
        >
          <CloseIcon />
        </IconButton>
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
    </Panel>
  );
}
