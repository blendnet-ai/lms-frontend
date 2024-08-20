import { useState } from "react";
import { ChatMessage } from "../../apis/ChatAPI";
import Header from "./components/Header";
import Messages from "./components/Messages";
import Input from "./components/Input";
import QuickOptions from "./components/QuickOptions";
import { Box, Typography } from "@mui/material";

type ChatBotProps = {
  messages: ChatMessage[];
  sendMessage: (val: string) => void;
  closeChatBot: (value: boolean) => void;
};

export default function ChatBot(props: ChatBotProps) {
  return (
    <Box
      sx={{
        boxShadow: "0 12px 24px 0 rgba(0, 0, 0, 0.15)",
        background: "#f5f8fb",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        width: "450px",
        overflow: "hidden",
        marginRight: "20px",
        marginBottom: "2vh",
        borderRadius: "40px 40px 0px 40px",
      }}
    >
      <Header close={props.closeChatBot} />
      {props.messages.length > 0 ? (
        <Messages messages={props.messages} />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "60vh",
          }}
        >
          <Box
            sx={{
              padding: "40px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                textAlign: "center",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: "32px 20px",
                borderRadius: "10px",
                height: "100%",
              }}
            >
              If you have any questions or need help, feel free to ask. I'm here
              to assist you with any doubts or clarifications you might need!
            </Typography>
          </Box>
          <QuickOptions senMessage={props.sendMessage} />
        </Box>
      )}

      <Input onSend={props.sendMessage} />
    </Box>
  );
}
