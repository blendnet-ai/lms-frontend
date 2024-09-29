import { Box, IconButton } from "@mui/material";
import { Panel } from "react-resizable-panels";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { DoubtSolvingContext } from "../Context/DoubtContext";
import YouTube, { YouTubeProps } from "react-youtube";
import pdfPreviewLinkConverter from "../Utils/PdfPreviewLinkConvertor";
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
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "500px",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={() => {
            context?.setReferenceOpen(false);
          }}
          sx={{}}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* for pdf  */}
      {referenceObject && referenceObject?.page_label && (
        <iframe
          src={pdfPreviewLinkConverter(referenceObject?.link)}
          width="100%"
          height="100%"
        />
      )}

      {/* for video  */}
      {referenceObject && referenceObject?.start_seconds && (
        <YouTube
          videoId={extractYouTubeId(referenceObject?.link)}
          opts={opts}
          onReady={onPlayerReady}
        />
      )}
    </Panel>
  );
}
