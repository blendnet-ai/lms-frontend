import { createChatBotMessage } from "react-chatbot-kit";
import { auth } from "./firebase";

const getProfileImage = () => {
  let profileImg = auth.currentUser?.photoURL;
  if (profileImg) {
    return profileImg;
  } else return "";
};

const config = {
  initialMessages: [createChatBotMessage(`Hello world`)],
  customComponents: {
    botAvatar: (props) => (
      <img
        className="react-chatbot-kit-chat-bot-avatar-container"
        src="/icons/bot.jpg"
        alt=""
      />
    ),
    userAvatar: (props) => (
      <img
        className="react-chatbot-kit-user-avatar-container"
        src={getProfileImage()}
        alt=""
      />
    ),
  },
};

export default config;
