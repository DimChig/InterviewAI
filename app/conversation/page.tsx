import ConversationLayout from "./ConversationLayout";
import { ChatHistoryProvider } from "./components/history/ChatHistoryContext";

const ConversationPage = () => {
  return (
    <div className="flex justify-center w-full h-screen bg-slate-100 overflow-hidden">
      <ChatHistoryProvider>
        <ConversationLayout />
      </ChatHistoryProvider>
    </div>
  );
};

export default ConversationPage;
