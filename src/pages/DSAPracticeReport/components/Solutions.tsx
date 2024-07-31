import {
  Box,
  CardMedia,
  Divider,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import { Card } from "../DSAPracticeReport";
import { icons } from "../../../assets";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import convertToEmbedLink from "../../../utils/convertToEmbedLink";

type SolutionsProps = {
  solution_resources?: {
    article_link?: string | null;
    video_link?: string | null;
  } | null;
};

export default function Solutions(props: SolutionsProps) {
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
            backgroundColor: "#FFF5D3",
            padding: "5px",
            width: "40px",
            height: "40px",
            borderRadius: "5px",
          }}
          src={icons.viewSolution}
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
              color: "#D8A600",
              fontWeight: "550",
              fontSize: "20px",
            }}
          >
            View Solution
          </Typography>

          <Box
            sx={{
              width: "100%",
              gap: "4px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* video link  */}
            {props?.solution_resources?.video_link ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                  height: "100%",
                  mt: "10px",
                }}
              >
                <Box
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <FiberManualRecordIcon sx={{ color: "#2059EE" }} />
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#000",
                    }}
                  >
                    Watch the video solution
                  </Typography>
                </Box>

                {/* thumbnail  */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <iframe
                    src={convertToEmbedLink(
                      props.solution_resources.video_link
                    )}
                    title="Valid Palindrome - Leetcode 125 - Python"
                    width={"100%"}
                    height={"100%"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </Box>

                {/* link  */}
                <Link
                  component="a"
                  href={props.solution_resources.video_link}
                  target="_blank"
                  sx={{ fontSize: "16px", color: "#2059EE" }}
                >
                  {props.solution_resources.video_link}
                </Link>
              </Box>
            ) : (
              // <Skeleton variant="rectangular" width={"100%"} height={300} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "150px",
                }}
              >
                <Typography
                  sx={{
                    backgroundColor: "#FFF5D3",
                    padding: "10px 20px",
                    fontSize: "20px",
                    borderRadius: "5px",
                    color: "#000",
                    fontWeight: "600",
                  }}
                >
                  No video solution available
                </Typography>
              </Box>
            )}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                width: "2px",
                margin: "0 10px",
                backgroundColor: "rgba(0, 0, 0, 0.20)",
              }}
            />
            {/* article link */}
            {props?.solution_resources?.article_link ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                  height: "100%",
                  mt: "10px",
                }}
              >
                <Box
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <FiberManualRecordIcon sx={{ color: "#2059EE" }} />
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#000",
                    }}
                  >
                    Read the article solution
                  </Typography>
                </Box>

                {/* link  */}
                <Link
                  href={props.solution_resources.article_link}
                  target="_blank"
                  sx={{ fontSize: "16px", color: "#2059EE" }}
                  component="a"
                >
                  {props.solution_resources.article_link}
                </Link>
              </Box>
            ) : (
              // <Skeleton variant="rectangular" width={"100%"} height={300} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "150px",
                }}
              >
                <Typography
                  sx={{
                    backgroundColor: "#FFF5D3",
                    padding: "10px 20px",
                    fontSize: "20px",
                    borderRadius: "5px",
                    color: "#000",
                    fontWeight: "600",
                  }}
                >
                  No article solution available
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
