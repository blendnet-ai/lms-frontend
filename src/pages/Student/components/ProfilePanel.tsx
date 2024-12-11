import { Avatar, Box, Button, Typography } from "@mui/material";
import DetailTag from "./DetailTag";
import { StudentDetails } from "../../../apis/LmsAPI";

interface ProfilePanelProps {
  studentData: StudentDetails | null;
}

const ProfilePanel = (props: ProfilePanelProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        width: "20%",
        height: "100%",
      }}
    >
      <Avatar
        sx={{
          width: "100px",
          height: "100px",
          margin: "auto",
          marginBottom: "20px",
        }}
      />
      <Typography
        sx={{ fontWeight: "bold", fontSize: "20px", textAlign: "center" }}
      >
        {props.studentData?.name}
      </Typography>

      {/* Details  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <DetailTag label="ID" value={props.studentData?.user_id} />
        <DetailTag label="Age" value={props.studentData?.age} />
        <DetailTag label="Gender" value={props.studentData?.gender} />
        <DetailTag label="College" value={props.studentData?.college} />
        <DetailTag label="Email" value={props.studentData?.email} />
        <DetailTag label="Mobile" value={`+91 ${props.studentData?.phone}`} />

        {/* Message  */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2059EE",
            color: "white",
            marginTop: "20px",
          }}
        >
          Message
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePanel;
