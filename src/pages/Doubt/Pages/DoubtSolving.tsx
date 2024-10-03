import {
  Box,
  Button,
  CardMedia,
  IconButton,
  MobileStepper,
  Typography,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { icons, images } from "../..//../assets";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import HistoryCard from "../Helpers/HistoryCard";
import CourseCard from "../Helpers/CourseCard";
import ModeCard from "../Helpers/ModeCard";
import SearchBar from "../../../components/SearchBar/SearchBar";
import DoubtSolvingAPI from "../Apis/DoubtSolvingAPI";
import { DoubtSolvingContext } from "../Context/DoubtContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface DoubtSolvingProps {
  name: string;
}

export default function DoubtSolving(props: DoubtSolvingProps) {
  const context = useContext(DoubtSolvingContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [conversations, setConversations] = useState<any[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);

  useEffect(() => {
    // Fetch courses
    const fetchCourses = async () => {
      setLoading(true); // Set loading to true before making the API call
      try {
        const response = await DoubtSolvingAPI.getCoursesForUser(
          context?.userId
        );
        setAllCourses(response?.courses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after the API call finishes (either success or failure)
      }
    };

    // Fetch conversations
    const fetchConversations = async () => {
      setLoadingConversations(true); // Set loading to true before making the API call
      try {
        const response = await DoubtSolvingAPI.getConversations(
          context?.userId
        );
        // setConversations([]);
        setConversations(response?.conversations);
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      } finally {
        setLoadingConversations(false); // Ensure loading is set to false after the API call finishes (either success or failure)
      }
    };

    fetchCourses();
    fetchConversations();
  }, [context?.userId]);

  // Pagination: 4 courses per page
  const itemsPerPage = 4;
  const maxSteps = Math.ceil(allCourses.length / itemsPerPage); // Number of steps based on pagination

  // Handlers for Next and Back
  const handleNext = () => {
    if (activeStep < maxSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const [query, setQuery] = useState("");

  // Start conversation handler
  const handleStartConversation = async () => {
    const response = await DoubtSolvingAPI.createConversation(
      context?.userId,
      context?.selectedCourse,
      context?.selectedMode
    );

    if (response) {
      navigate(`/conversation/${response.conversation_id}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
      }}
    >
      {/* content  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100vh",
          backgroundColor: "#EFF6FF",
          padding: "20px",
          gap: "20px",
        }}
      >
        {/* Left side  */}
        {/* history tab  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "20%",
            padding: "20px",
            backgroundColor: "#fff",
            height: "100%",
            borderRadius: "10px",
            overflowY: "auto",
          }}
        >
          {/* title  */}
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#000",
              mb: "20px",
            }}
          >
            History
          </Typography>

          {/* history list  */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            {/* time  */}
            {conversations.length > 0 && (
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Today
              </Typography>
            )}

            {conversations.length > 0 &&
              conversations.map((conversation) => (
                <HistoryCard
                  key={conversation.conversation_id}
                  conversationId={conversation.conversation_id}
                  courseId={conversation.course_id}
                  courseName={conversation.course_name}
                  mode={conversation.mode}
                  createdAt={conversation.created_at}
                  updatedAt={conversation.updated_at}
                  isSelected={
                    conversation.conversation_id ===
                    Number(location.pathname.split("/")[2])
                  }
                />
              ))}

            {/* when no conversations are available */}
            {conversations.length === 0 && !loadingConversations && (
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                No conversations available
              </Typography>
            )}

            {/* when conversations are loading */}
          </Box>
        </Box>

        {/* right */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            padding: "20px",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          {/* form  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              width: "100%",
              maxWidth: "80%",
              height: "auto",
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            {/* top left back button  */}
            {context?.selectedCourse !== null && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "#EFF6FF",
                  border: "1px solid #CFE4FF",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  context?.setSelectedCourse(null);
                  context?.setSelectedMode(null);
                }}
              >
                <KeyboardArrowLeft />
              </IconButton>
            )}

            {/* top banner */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                maxWidth: "800px",
                gap: "20px",
              }}
            >
              <CardMedia
                component="img"
                image={images.dishaCrop}
                sx={{
                  width: "200px",
                  objectFit: "contain",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    padding: "20px 15px",
                    textAlign: "center",
                    borderRadius: "0 0 10px 10px",
                    backgroundColor: "#EFF6FF",
                    border: "1px solid #CFE4FF",
                  }}
                >
                  {allCourses.length > 0 && context?.selectedCourse === null
                    ? `Hi ${props.name}, please choose your preferred course.`
                    : `Hi ${props.name}, please choose your preferred conversation mode.`}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                gap: "10px",
                maxWidth: "800px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "end",
                  justifyContent: "space-between",
                }}
              >
                {/* title  */}
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#2059EE",
                  }}
                >
                  {context?.selectedCourse !== null
                    ? "Select Conversation Mode"
                    : "Select Course"}
                </Typography>

                {context?.selectedCourse === null && (
                  <SearchBar
                    query={query}
                    setQuery={setQuery}
                    customStyles={{
                      p: "0px 0px",
                      width: "200px",
                      backgroundColor: "#EFF6FF",
                      border: "1px solid #2059EE",
                    }}
                  />
                )}
              </Box>

              {context?.selectedCourse === null ? (
                <Box
                  component={motion.div}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* If courses are available and not selected, show courses */}
                  {allCourses && allCourses.length > 0 && !loading && (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                        width: "100%",
                        mt: "20px",
                        mb: allCourses.length < 4 ? "4rem" : "0",
                      }}
                    >
                      {allCourses
                        .slice(
                          activeStep * itemsPerPage,
                          (activeStep + 1) * itemsPerPage
                        )
                        .map((course) => (
                          <CourseCard
                            key={course.id}
                            name={course.name}
                            id={course.id}
                            desc={course.description}
                            // courseProvider={course.courseProvider}
                          />
                        ))}
                    </Box>
                  )}

                  {/* if no courses available */}
                  {allCourses.length === 0 && !loading && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        gap: "20px",
                        width: "100%",
                        my: "4rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "18px",
                          color: "#000",
                          textAlign: "center",
                          backgroundColor: "#EFF6FF",
                          padding: "10px 20px",
                          borderRadius: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Please enroll in a course to start solving your doubts,
                        revise concepts or discuss with peers.
                      </Typography>
                    </Box>
                  )}

                  {/* when courses are loading */}
                  {loading && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        gap: "20px",
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "18px",
                          color: "#000",
                          textAlign: "center",
                          backgroundColor: "#EFF6FF",
                          padding: "10px 20px",
                          borderRadius: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Loading courses...
                      </Typography>
                    </Box>
                  )}

                  {/* stepper  */}
                  {allCourses.length > 4 && !loading && (
                    <MobileStepper
                      variant="dots"
                      steps={maxSteps}
                      position="static"
                      activeStep={activeStep}
                      sx={{
                        mt: "auto",
                        width: "100%",
                      }}
                      nextButton={
                        <Button
                          size="small"
                          onClick={handleNext}
                          disabled={activeStep === maxSteps - 1} // Disable "Next" on the last step
                        >
                          Next
                          {theme.direction === "rtl" ? (
                            <KeyboardArrowLeft />
                          ) : (
                            <KeyboardArrowRight />
                          )}
                        </Button>
                      }
                      backButton={
                        <Button
                          size="small"
                          onClick={handleBack}
                          disabled={activeStep === 0} // Disable "Back" on the first step
                        >
                          {theme.direction === "rtl" ? (
                            <KeyboardArrowRight />
                          ) : (
                            <KeyboardArrowLeft />
                          )}
                          Back
                        </Button>
                      }
                    />
                  )}
                </Box>
              ) : (
                <Box
                  component={motion.div}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "40px",
                    width: "100%",
                    height: "100%",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Conversation mode  */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                      width: "100%",
                    }}
                  >
                    <ModeCard
                      name="Doubts"
                      image={icons.doubtMode}
                      id={1}
                      desc="Get quick answers"
                      locked={false}
                    />
                    <ModeCard
                      name="Discuss"
                      image={icons.discussMode}
                      id={2}
                      desc="Build your understanding"
                      locked={true}
                    />
                    <ModeCard
                      name="Revise"
                      image={icons.reviseMode}
                      id={3}
                      desc="Revisit past lessons"
                      locked={true}
                    />
                  </Box>

                  {/* start button  */}
                  <Button
                    disabled={context?.selectedMode === null}
                    sx={{
                      backgroundColor: "#3F51B5",
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      width: "max-content",
                      "&:hover": {
                        backgroundColor: "#303F9F",
                      },
                    }}
                    onClick={handleStartConversation}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        textTransform: "none",
                      }}
                    >
                      Start Conversation
                    </Typography>
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
