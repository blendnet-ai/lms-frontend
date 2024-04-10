import React, { useEffect, useContext } from "react";
import { BotContext } from "../pages/Learning";
const ActionProvider = ({ createChatBotMessage, setState, children, rest }) => {
  const ws = useContext(BotContext);

  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  ws.onmessage = (event) => {
    const botMessage = createChatBotMessage(event.data);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSendWsMsg = (message) => {
    ws.send(message);
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
