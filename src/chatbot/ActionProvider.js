import React, { useEffect, useContext } from "react";
import { BotContext } from "../pages/Learning";
import { auth } from "../configs/firebase";

const RESPONSE_WAIT_MSG = "...";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const { ws, videoId, videoPlayedDuration } = useContext(BotContext);

  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  ws.onmessage = (event) => {
    const botMessage = createChatBotMessage(JSON.parse(event.data).message);

    setState((prev) => {
      const lastMessageIndex = prev.messages.length - 1;
      const lastMessage = prev.messages[lastMessageIndex];

      console.log(lastMessage);

      if (
        lastMessage.message === RESPONSE_WAIT_MSG &&
        lastMessage.type === "bot"
      ) {
        // If the last message is RESPONSE_WAIT_MSG and is a bot message then remove it and add the received botMessage
        return {
          ...prev,
          messages: [...prev.messages.slice(0, -1), botMessage],
        };
      } else {
        // If the last message is not "..." then just add the received botMessage
        return {
          ...prev,
          messages: [...prev.messages, botMessage],
        };
      }
    });
  };

  const handleSendWsMsg = async (message) => {
    ws.send(
      JSON.stringify({
        message: message,
        video_id: videoId,
        token: await auth.currentUser.getIdToken(),
        timestamp: videoPlayedDuration,
      })
    );

    const botDotMsg = createChatBotMessage(RESPONSE_WAIT_MSG, {
      loading: true,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botDotMsg],
    }));
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
