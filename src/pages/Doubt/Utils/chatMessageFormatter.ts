const formattedChats = (
  chats: {
    id: [number];
    role: string;
    content: string;
    timestamp: number;
    message_generation_time?: number;
  }[]
) => {
  return chats.map((chat) => {
    if (chat.role === "assistant") {
      // before parsing, convert string from {{}} to {}
      let pre_content = chat.content.replace(/{{/g, "{").replace(/}}/g, "}");
      const content = JSON.parse(pre_content);
      return {
        id: chat.id[0],
        role: chat.role,
        content: content.response,
        references: content.references,
        timestamp: chat.timestamp,
        message_generation_time: chat.message_generation_time,
      };
    }
    return chat;
  });
};

export default formattedChats;

// Backup code
// const formattedChats = (
//   chats: {
//     id: [number];
//     role: string;
//     content: string;
//     timestamp: number;
//     message_generation_time?: number;
//   }[]
// ) => {
//   return chats.map((chat) => {
//     if (
//       chat.role === "assistant" &&
//       chat.content.includes("{{") &&
//       chat.content.includes("}}")
//     ) {
//       // before parsing, convert string from {{}} to {}
//       let pre_content = chat.content.replace(/{{/g, "{").replace(/}}/g, "}");
//       const content = JSON.parse(pre_content);
//       return {
//         id: chat.id[0],
//         role: chat.role,
//         content: content.response,
//         references: content.references,
//         timestamp: chat.timestamp,
//         message_generation_time: chat.message_generation_time,
//       };
//     }
//     return chat;
//   });
// };

// export default formattedChats;
