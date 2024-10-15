import {
  Box,
  CardMedia,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { DoubtSolvingContext } from "../Context/DoubtContext";
import { extractCodeFromString } from "../Utils/extractCodeFromString";
import { icons, images } from "../../../assets";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Link } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import convertSecondsToHHMMSS from "../Utils/convertTime";

interface BotDataResponse {
  content: string;
  references: [
    {
      title: string;
      start_seconds?: string | null;
      page_label?: string | null;
      link: string;
    }
  ];
}

const BotMessage = ({
  data,
  isCode,
}: {
  data: BotDataResponse;
  isCode: boolean;
}) => {
  const context = useContext(DoubtSolvingContext);

  // function to copy code
  const handleCopyCode = (code: string) => {
    const { code: extractedCode } = extractCodeFromString(code);
    if (extractedCode) {
      navigator.clipboard.writeText(extractedCode);
      setOpen(true);
    } else {
      console.error("No code to copy");
    }
  };

  const [open, setOpen] = useState(false);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
          maxWidth: isCode ? "50%" : "80%",
        }}
      >
        <CardMedia
          component="img"
          image={images.dishaMadam}
          alt="avatar"
          sx={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: isCode ? "20px" : "15px",
            backgroundColor: "#EFF6FF",
            borderRadius: "10px",
          }}
        >
          <Markdown
            components={{
              code(props: any) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "grey",
                        color: "white",
                        padding: "10px",
                        borderRadius: "10px 10px 0 0",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                        }}
                      >
                        {match[1].charAt(0).toUpperCase() + match[1].slice(1)}
                      </Typography>

                      {/* copy button  */}
                      {isCode && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Tooltip title="Copy Code">
                            <IconButton
                              type="button"
                              onClick={() => handleCopyCode(data?.content)}
                              aria-label="search"
                            >
                              {open ? (
                                <DoneIcon
                                  sx={{
                                    color: "white",
                                    fontSize: "1rem",
                                  }}
                                />
                              ) : (
                                <ContentCopyIcon
                                  sx={{
                                    color: "white",
                                    fontSize: "1rem",
                                  }}
                                />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Typography>
                            {open ? "Copied!" : "Copy code"}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      style={a11yDark}
                      wrapLongLines={true}
                      wrapLines={true}
                      customStyle={{
                        borderRadius: "0 0 10px 10px",
                        // margin: "10px 0px",
                      }}
                    />
                  </Box>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                    {/* copy button here */}
                  </code>
                );
              },
              ol(props: any) {
                return <ol {...props} style={{ margin: "0 0 0 25px" }} />;
              },
              ul(props: any) {
                return <ul {...props} style={{ margin: "0 0 0 25px" }} />;
              },
              p(props: any) {
                return <p {...props} style={{ margin: "0" }} />;
              },
              pre(props: any) {
                return <pre {...props} style={{ margin: "0", padding: "0" }} />;
              },
            }}
          >
            {data?.content}
          </Markdown>
        </Box>
      </Box>
      {/* resources  */}
      {data.references && data.references.length > 0 && (
        <Typography
          sx={{
            color: "#000",
            fontSize: "1rem",
            fontWeight: 700,
            padding: "10px 50px",
            borderRadius: "10px",
          }}
        >
          Resources
        </Typography>
      )}
      {/* reference cards  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          margin: "0px 50px",
        }}
      >
        {data.references &&
          data.references.map((reference) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                backgroundColor: "#EFF6FF",
                borderRadius: "10px",
                gap: "10px",
                width: "max-content",
              }}
            >
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "1rem",
                }}
              >
                {reference.title}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                {reference.link.includes("youtube") ? (
                  <CardMedia
                    component="img"
                    image={icons.resourceVideo}
                    sx={{ width: 20, height: 20 }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    image={icons.resourcePdf}
                    sx={{ width: 20, height: 20 }}
                  />
                )}
                <Link
                  onClick={() => {
                    context?.setReferenceObject(reference);
                    context?.setReferenceOpen(true);
                  }}
                  to={""}
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  {reference.page_label
                    ? `Page ${reference.page_label}`
                    : `Starts at ${convertSecondsToHHMMSS(
                        parseInt(reference.start_seconds || "0")
                      )}`}
                </Link>
              </Box>
            </Box>
          ))}
      </Box>

      {/* snackbar for code copied */}
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Code copied to clipboard!"
      />
    </Box>
  );
};

export default BotMessage;
