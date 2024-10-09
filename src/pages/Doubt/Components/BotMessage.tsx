import { Box, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import { useContext } from "react";
import { DoubtSolvingContext } from "../Context/DoubtContext";
import { extractCodeFromString } from "../Utils/extractCodeFromString";
import { icons, images } from "../../../assets";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Link } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { StringUtil } from "../../../utils/strings";

interface BotDataResponse {
  content: string;
  references: [
    {
      title: string;
      start_time?: string | null;
      page_label?: string | null;
      link: string;
    }
  ];
}

const BotMessage = ({ data }: { data: BotDataResponse }) => {
  const context = useContext(DoubtSolvingContext);
  const isCodeExists = extractCodeFromString(data?.content).code ? true : false;

  // function to copy code
  const handleCopyCode = (code: string) => {
    const { code: extractedCode } = extractCodeFromString(code);
    if (extractedCode) {
      navigator.clipboard.writeText(extractedCode);
    } else {
      console.error("No code to copy");
    }
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
        }}
      >
        <CardMedia
          component="img"
          image={images.dishaMadam}
          alt="avatar"
          sx={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        <Typography
          sx={{
            color: "#000",
            fontSize: "1rem",
            padding: "10px",
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
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={a11yDark}
                    wrapLongLines={true}
                    wrapLines={true}
                    customStyle={{
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {/* {StringUtil.replaceNewlinesWithSpacesOutsideCodeBlocks( */}
              {data?.content}
            {/* )} */}
          </Markdown>

          {/* copy button here */}
          {isCodeExists && (
            <Tooltip title="Copy Code">
              <IconButton
                type="button"
                onClick={() => handleCopyCode(data?.content)}
                sx={{
                  mt: "10px",
                  p: "10px",
                }}
                aria-label="search"
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
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
                >
                  Link to the resource
                </Link>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default BotMessage;
