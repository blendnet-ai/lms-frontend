import { Box } from "@mui/material";

interface HighlightedBoxProps {
  children: React.ReactNode;
}

export default function HighlightedBox({ children }: HighlightedBoxProps) {
  return (
    <Box
      sx={{
        padding: "10px",
        background: "#f5f5f5",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      {children}
    </Box>
  );
}
