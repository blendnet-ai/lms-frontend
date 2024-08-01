import { useEffect, useRef } from "react";
import { ChatMessage, Sender } from "../../../apis/ChatAPI";
import { icons } from "../../../assets";
import { auth } from "../../../configs/firebase";
import { Box } from "@mui/material";
import { breakText } from "../../DSATest/DSATest";

type MessagesProps = {
  messages: ChatMessage[];
};

export default function Messages(props: MessagesProps) {
  const el = useRef<any>(null);
  useEffect(() => {
    if (el && el.current)
      el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "60vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "10px 0",
      }}
    >
      {props.messages.map((message) => {
        return message.type === Sender.USER ? (
          <UserMessage text={message.message} />
        ) : (
          <BotMessage text={message.message} />
        );
      })}
      <div id={"el"} ref={el} />
    </Box>
  );
}

type UserMessageProps = {
  text: string;
};
function UserMessage(props: UserMessageProps) {
  const getProfileImage = () => {
    let profileImg = auth.currentUser?.photoURL;
    if (profileImg) {
      return profileImg;
    } else return "";
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          float: "right",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <Box
          sx={{
            padding: "15px 10px",
            margin: "10px",
            borderRadius: "20px 20px 1px 20px",
            backgroundColor: "#cccccc",
            color: "black",
          }}
        >
          {props.text}
        </Box>
        <img
          style={{
            height: 50,
            width: "50px",
            borderRadius: "100px",
          }}
          src={getProfileImage()}
          alt=""
        />
      </Box>
    </Box>
  );
}

type BotMessage = {
  fetchMessage: any;
};

function BotMessage(props: UserMessageProps) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          float: "left",
          display: "flex",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <img
          style={{
            height: 50,
            width: "50px",
            borderRadius: "100px",
          }}
          src={icons.bot}
          alt=""
        />
        <Box
          sx={{
            padding: "15px 20px",
            margin: "5px",
            borderRadius: "20px",
            backgroundColor: "#5c81df",
            color: "white",
            minWidth: "40px",
          }}
        >
          {breakText(props.text)}
        </Box>
      </Box>
    </Box>
  );
}
