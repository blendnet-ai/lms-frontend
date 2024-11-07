import React, { useEffect } from "react";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { images } from "../../assets";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MockInterviewAPI from "./apis/MockInterviewApi";
import { MockInterviewContext } from "./Context/MockInterviewContext";
import renderField from "./components/RenderField";

const Interview = () => {
  const { setActiveQuestionId } = React.useContext(MockInterviewContext);
  const navigate = useNavigate();
  const [availableInterviews, setAvailableInterviews] = React.useState<any[]>(
    []
  );
  const [selectedSection, setSelectedSection] = React.useState("");
  const [assessmentId, setAssessmentId] = React.useState(0);

  const methods = useForm();
  const { control, handleSubmit, getValues } = methods;

  // Fetch available interviews
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await MockInterviewAPI.getInterviews();
        console.log(response);
        setAvailableInterviews(response);
      } catch (error) {
        console.error("Error fetching available interviews", error);
      }
    };

    fetchInterviews();
  }, []);

  // Function to handle section change
  const handleSectionChange = (sectionName: string) => {
    setSelectedSection(sectionName);
    const section = availableInterviews[0]?.sections.find(
      (sec: { display_name: string }) => sec.display_name === sectionName
    );
    if (section) setAssessmentId(section.assessment_generation_config_id);
  };

  // Function to submit form
  const submitForm = async () => {
    const values = getValues();
    try {
      const response = await MockInterviewAPI.startAssessment(
        assessmentId,
        values.role,
        values.difficulty_level
      );
      console.log(response);
      setActiveQuestionId(response.questions[0].questions[0]);
      localStorage.setItem(
        "activeQuestionId",
        response.questions[0].questions[0]
      );

      if (response?.assessment_id) {
        navigate(`/mock-interview/${response?.assessment_id}`, {
          replace: true,
          state: { data: response },
        });
      }
    } catch (error) {
      console.error("Error starting assessment", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        backgroundColor: "#EFF6FF",
      }}
    >
      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "60%",
          mx: "auto",
          mt: "20px",
          backgroundColor: "white",
          boxShadow: "0px 4px 4px 0px #00000040",
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            mt: "20px",
            mb: "20px",
            color: "#205EFF",
          }}
        >
          Interview Details
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "750px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: "20px",
              padding: "20px",
            }}
          >
            <CardMedia
              component="img"
              image={images.interviewDisha}
              alt="avatar"
              sx={{ width: 150, height: 150, borderRadius: "15px" }}
            />
            <Typography
              sx={{
                fontSize: "16px",
                border: "2px solid #CFE4FF",
                borderRadius: "0px 10px 10px 10px",
                padding: "10px",
                width: "100%",
                mb: "20px",
                backgroundColor: "#EFF6FF",
              }}
            >
              {(selectedSection &&
                availableInterviews[0]?.sections.find(
                  (section: { display_name: string }) =>
                    section.display_name === selectedSection
                )?.instructions) ||
                "Select an interview type to view instructions"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                mr: "20px",
              }}
            >
              Select Interview Type:
            </Typography>

            {/* Types */}
            <Box
              sx={{
                display: "flex",
                gap: "20px",
              }}
            >
              {availableInterviews[0]?.sections.map((section: any) => (
                <Button
                  key={section.id}
                  onClick={() => handleSectionChange(section.display_name)}
                  sx={{
                    backgroundColor:
                      selectedSection === section.display_name
                        ? "#205EFF"
                        : "#fff",
                    color:
                      selectedSection === section.display_name
                        ? "#fff"
                        : "#000",
                    border: "1px solid #205EFF",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#205EFF",
                      color: "#fff",
                    },
                  }}
                >
                  {section.display_name}
                </Button>
              ))}
            </Box>
          </Box>

          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit(submitForm)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                mr: "auto",
                padding: "20px",
                mb: "40px",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                {selectedSection &&
                  availableInterviews[0]?.sections
                    .find(
                      (section: { display_name: string }) =>
                        section.display_name === selectedSection
                    )
                    ?.fields.map((field: any, index: any) =>
                      renderField(field, index, control)
                    )}
              </Box>

              {selectedSection && (
                <Button
                  type="submit"
                  size="large"
                  sx={{
                    color: "white",
                    padding: "10px 30px",
                    borderRadius: "10px",
                    backgroundColor: "#205EFF",
                    "&:hover": {
                      backgroundColor: "#205EFF",
                    },
                  }}
                >
                  Start Interview
                </Button>
              )}
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default Interview;
