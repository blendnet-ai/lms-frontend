import { Box } from "@mui/material";

interface CardProps {
  children: React.ReactNode;
  styles?: React.CSSProperties;
}
export function Card(props: CardProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: "10px",
      }}
      style={props.styles}
    >
      {props.children}
    </Box>
  );
}
