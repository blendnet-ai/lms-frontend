// categorize on the basis of Today, yesterday, last 7 days and last month
const categorizeConversations = (conversations: any[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const last7Days = new Date(today);
  last7Days.setDate(last7Days.getDate() - 7);

  const todayConversations = conversations.filter((conversation) => {
    const conversationDate = new Date(conversation?.updated_at);
    return (
      conversationDate.getDate() === today.getDate() &&
      conversationDate.getMonth() === today.getMonth() &&
      conversationDate.getFullYear() === today.getFullYear()
    );
  });

  const yesterdayConversations = conversations.filter((conversation) => {
    const conversationDate = new Date(conversation?.updated_at);
    return (
      conversationDate.getDate() === yesterday.getDate() &&
      conversationDate.getMonth() === yesterday.getMonth() &&
      conversationDate.getFullYear() === yesterday.getFullYear()
    );
  });

  const last7DaysConversations = conversations.filter((conversation) => {
    const conversationDate = new Date(conversation?.updated_at);
    return (
      conversationDate > last7Days &&
      conversationDate.getDate() !== today.getDate() &&
      conversationDate.getDate() !== yesterday.getDate()
    );
  });

  return {
    total: conversations.length,
    data: [
      {
        type: "Today",
        total: todayConversations.length,
        history: todayConversations,
      },
      {
        type: "Yesterday",
        total: yesterdayConversations.length,
        history: yesterdayConversations,
      },
      {
        type: "Previous 7 Days",
        total: last7DaysConversations.length,
        history: last7DaysConversations,
      },
    ],
  };
};

export default categorizeConversations;
