import { Avatar, Box, Button, Typography } from '@mui/material'
import DetailTag from './components/DetailTag'

const ProfilePanel = () => {
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
      {studentData?.user_stats.name}
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
      <DetailTag label="ID" value={studentData?.user_stats?.user_id} />
      <DetailTag label="Age" value={studentData?.user_stats?.age} />
      <DetailTag label="Gender" value={studentData?.user_stats?.gender} />
      <DetailTag
        label="College"
        value={studentData?.user_stats?.college}
      />
      <DetailTag label="Email" value={studentData?.user_stats?.email} />
      <DetailTag
        label="Mobile"
        value={`+91 ${studentData?.user_stats?.phone}`}
      />

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
  )
}

export default ProfilePanel