import { Box } from "@mui/material";
import { useState } from "react";

type InputProps = {
  onSend: (val: string) => void;
};
export default function Input(props: InputProps) {
  const [text, setText] = useState("");

  const handleInputChange = (e: any) => {
    setText(e.target.value);
  };

  const handleSend = (e: any) => {
    e.preventDefault();
    props.onSend(text);
    setText("");
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <form onSubmit={handleSend}>
        <input
          style={{
            fontFamily: "monospace",
            fontSize: "16px",
            border: 0,
            borderRadius: 0,
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            borderTop: "1px solid #eee",
            boxShadow: "none",
            boxSizing: "border-box",
            opacity: 1,
            width: "100%",
            padding: "26px",
            outline: "none",
          }}
          type="text"
          onChange={handleInputChange}
          value={text}
          placeholder="Type your message..."
        />
        <button
          style={{
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            height: "100%",
            backgroundColor: "transparent",
            border: 0,
            borderBottomRightRadius: "10px",
            boxShadow: "none",
            cursor: "pointer",
            fill: "#4a4a4a",
            opacity: 1,
            outline: "none",
            padding: "14px 16px 12px 16px",
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 500 500"
          >
            <g>
              <g>
                <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
              </g>
            </g>
          </svg>
        </button>
      </form>
    </Box>
  );
}
