import { Box } from "@mui/material";

type OptionProps = {
  text: string;
  onClick: () => void;
};

function Option(props: OptionProps) {
  return (
    <Box
      onClick={props.onClick}
      sx={{
        background: "#EFF6FF",
        padding: "10px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: "10px",
        border: "1px solid #CFE4FF",
        fontSize: "16px",
        fontWeight: "350",
      }}
    >
      {props.text}
    </Box>
  );
}

type QuickOptionsProps = {
  senMessage: (text: string) => void;
};

const quickOptions = [
  "Can you explain the question?",
  "I’m stuck! Give me a hint",
  "Identify bugs in the code",
];
export default function QuickOptions(props: QuickOptionsProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "10px 0",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          gap: "10px",
          display: "flex",
          padding: "10px",
        }}
      >
        {quickOptions.map((option) => (
          <Option
            text={option}
            onClick={() => {
              props.senMessage(option);
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
