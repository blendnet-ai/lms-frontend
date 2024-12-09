import { Box, Button, Typography } from "@mui/material";
import { auth } from "../configs/firebase";

interface NoRoleProps {
  userData: string;
}

function NoRole({ userData }: NoRoleProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "600px",
        backgroundColor: "#fff",
        padding: "3rem",
      }}
    >
      <Typography
        sx={{
          color: "#000",
          fontSize: "2rem",
          fontWeight: 600,
        }}
      >
        Access Denied!
      </Typography>

      <Typography
        sx={{
          color: "#000",
          fontSize: "1rem",
          padding: "1.5rem",
          backgroundColor: "#F7E7E8",
          borderRadius: "5px",
          mt: "1rem",
          borderLeft: "5px solid #f44336",
        }}
      >
        Sorry, <strong>{userData}</strong> is not registered with us. Please
        contact your institute to get your email registered, or try signing in
        with a different email.
      </Typography>

      {/* logout button  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "2rem",
          ml: "auto",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default NoRole;
