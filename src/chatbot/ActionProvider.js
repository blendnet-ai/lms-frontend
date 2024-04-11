import React, { useEffect, useContext } from "react";
import { BotContext } from "../pages/Learning";
import { auth } from "../configs/firebase";
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const { ws, videoId } = useContext(BotContext);

  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  ws.onmessage = (event) => {
    const botMessage = createChatBotMessage(JSON.parse(event.data).message);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSendWsMsg = async (message) => {
    ws.send(
      JSON.stringify({
        message: message,
        video_id: videoId,
        token: await auth.currentUser.getIdToken(),
      })
    );
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleSendWsMsg,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
