import { useState } from "react";
import { ChatMessage } from "../../apis/ChatAPI";
import Header from "./components/Header";
import Messages from "./components/Messages";
import Input from "./components/Input";
import QuickOptions from "./components/QuickOptions";
import { Box } from "@mui/material";

type ChatBotProps = {
  messages: ChatMessage[];
  sendMessage: (val: string) => void;
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
        marginBottom: "8vh",
        borderRadius: "40px 40px 0px 40px",
      }}
    >
      <Header />
      {props.messages.length > 0 ? (
        <Messages messages={props.messages} />
      ) : (
        <QuickOptions senMessage={props.sendMessage} />
      )}

      <Input onSend={props.sendMessage} />
    </Box>
  );
}
