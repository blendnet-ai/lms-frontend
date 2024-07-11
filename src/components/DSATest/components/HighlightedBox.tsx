import { Box } from "@mui/material";

interface HighlightedBoxProps {
  children: React.ReactNode;
  error?: boolean;
}

export default function HighlightedBox({
  children,
  error,
}: HighlightedBoxProps) {
  return (
    <Box
      sx={{
        padding: "10px",
        background: error ? "#f7b5b5" : "#f5f5f5",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      {children}
    </Box>
  );
}
