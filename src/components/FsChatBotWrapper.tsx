import Chatbot from "react-chatbot-kit";
import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";
import { IMessage } from "react-chatbot-kit/build/src/interfaces/IMessages";
import "./../styles/FsChatBotWrapper.css";

// Had to made a separate component for having separate css than the default chat bot
type Props = {
  actionProvider: any;
  messageParser: any;
  config: IConfig;
  headerText?: string;
  placeholderText?: string;
  saveMessages?: (ref: any) => any;
  messageHistory?: IMessage[] | string;
  validator?: (input: string) => Boolean;
  runInitialMessagesWithHistory?: Boolean;
  disableScrollToBottom?: boolean;
};
const FsChatBotWrapper = (props: Props) => {
  return (
    <Chatbot
      config={props.config}
      messageHistory={props.messageHistory}
      messageParser={props.messageParser}
      actionProvider={props.actionProvider}
      saveMessages={props.saveMessages}
    />
  );
};

export default FsChatBotWrapper;
