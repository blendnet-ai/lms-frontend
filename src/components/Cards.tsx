import { Box, Button, Typography } from "@mui/material";

interface AssessmentProps {
  assessmentNumber: number;
  assessmentDescription: string;
  assessmentName?: string;
  timeAgo?: string;
  questionsCount?: number;
  bgColor?: string;
  startHandler?: () => void;
  totalAttempts?: number;
  userAttempts?: number;
}

export const AssessmentCard = (props: AssessmentProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        height: "250px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 30.2px 0px #32558930",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      {/* header here */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: props.bgColor ? props.bgColor : "#EC6980",
          padding: "10px 30px",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {props.assessmentName ? props.assessmentName : "Assessment"}
        </Typography>

        {/* {props.userAttempts && props.totalAttempts && ( */}
          <Typography
            sx={{
              fontSize: "16px",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
              backgroundColor: "#D01215",
            }}
          >
            {props.userAttempts} / {props.totalAttempts} Attempts
          </Typography>
        {/* // )} */}
      </Box>

      {/* body here */}
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            color: "#333",
          }}
        >
          Assessment {props.assessmentNumber}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#333",
          }}
        >
          {props.assessmentDescription || "No Description"}
        </Typography>
      </Box>

      {/* footer here */}
      {props.timeAgo && (
        <Typography
          sx={{
            position: "absolute",
            bottom: "0",
            right: "0",
            padding: "10px 30px",
            fontSize: "18px",
            color: "lightgrey",
          }}
        >
          {props.timeAgo}
        </Typography>
      )}

      {/* button here */}
      {props.startHandler && (
        <Button
          sx={{
            mt: "auto",
            fontSize: "18px",
            color: "#fff",
            backgroundColor: "#455A64",
            borderRadius: "0px 0px 5px 5px",
            "&:hover": {
              backgroundColor: "#455A64",
              color: "#fff",
            },
          }}
          onClick={props.startHandler}
        >
          Start Assessment
        </Button>
      )}
    </Box>
  );
};

interface NewsProps {
  newsDescription: string;
  timeAgo: string;
}
export const NewsCard = (props: NewsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        height: "250px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 30.2px 0px #32558930",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      {/* header here */}
      <Typography
        sx={{
          backgroundColor: "#2059EE",
          padding: "10px 30px",
          fontSize: "18px",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        News
      </Typography>

      {/* body here */}
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            color: "#333",
          }}
        >
          {props.newsDescription}
        </Typography>
      </Box>

      {/* footer here */}
      <Typography
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
          padding: "10px 30px",
          fontSize: "18px",
          color: "lightgrey",
        }}
      >
        {props.timeAgo}
      </Typography>
    </Box>
  );
};

interface CoursesProps {
  id: number;
  title: string;
  code: string;
  setProviderId: (id: number) => void;
}
export const CoursesCard = (props: CoursesProps) => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        height: "250px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 30.2px 0px #32558930",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      {/* header here */}
      <Typography
        sx={{
          backgroundColor: "#2059EE",
          padding: "10px 30px",
          fontSize: "18px",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        Course
      </Typography>

      {/* body here */}
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            color: "#333",
          }}
        >
          {props.title}
        </Typography>
      </Box>

      {/* button  */}
      <Button
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          padding: "10px 30px",
          fontSize: "18px",
          color: "#2059EE",
          backgroundColor: "#fff",
          border: "1px solid #2059EE",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "#2059EE",
            color: "#fff",
          },
        }}
        onClick={() => {
          props.setProviderId(props.id);
        }}
      >
        View Batches
      </Button>

      {/* footer here */}
      <Typography
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
          padding: "10px 30px",
          fontSize: "18px",
          color: "lightgrey",
        }}
      >
        {props.code}
      </Typography>
    </Box>
  );
};

interface BatchProps {
  id: number;
  title: string;
  openModal: () => void;
  setIdOfBatch: (id: number) => void;
}
export const BatchCard = (props: BatchProps) => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        height: "250px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 30.2px 0px #32558930",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      {/* header here */}
      <Typography
        sx={{
          backgroundColor: "#EC6980",
          padding: "10px 30px",
          fontSize: "18px",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        Batch
      </Typography>

      {/* body here */}
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            color: "#333",
          }}
        >
          {props.title}
        </Typography>
      </Box>

      {/* button  */}
      <Button
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          padding: "10px 30px",
          fontSize: "18px",
          color: "#00995B",
          backgroundColor: "#fff",
          border: "1px solid #00995B",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "#00995B",
            color: "#fff",
          },
        }}
        onClick={() => {
          props.openModal();
          props.setIdOfBatch(props.id);
        }}
      >
        Create Live Class
      </Button>

      {/* footer here */}
      <Typography
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
          padding: "10px 30px",
          fontSize: "18px",
          color: "lightgrey",
        }}
      >
        Batch
      </Typography>
    </Box>
  );
};
