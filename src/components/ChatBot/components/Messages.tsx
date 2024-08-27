import { useEffect, useRef } from "react";
import { ChatMessage, Sender } from "../../../apis/ChatAPI";
import { icons } from "../../../assets";
import { auth } from "../../../configs/firebase";
import { Box } from "@mui/material";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { StringUtil } from "../../../utils/strings";

type MessagesProps = {
  messages: ChatMessage[];
};

type UserAndBotMessageProps = {
  text: string;
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

function UserMessage(props: UserAndBotMessageProps) {
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
          <Markdown
            components={{
              code(props: any) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={materialDark}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {props.text}
          </Markdown>
          {/* <Markdown>{props.text}</Markdown> */}
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

function BotMessage(props: UserAndBotMessageProps) {
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
          <Markdown
            components={{
              code(props: any) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={materialDark}
                    wrapLongLines={true}
                    wrapLines={true}
                    customStyle={{
                      whiteSpace: "pre-wrap",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {StringUtil.replaceNewlinesWithSpacesOutsideCodeBlocks(props.text)}
          </Markdown>
        </Box>
      </Box>
    </Box>
  );
}
