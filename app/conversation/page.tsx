import { Metadata } from "next";
import ConversationLayout from "./ConversationLayout";
import { ChatHistoryProvider } from "./components/history/ChatHistoryContext";
import { ResponseLoadingProvider } from "./components/history/ResponseLoadingContext";
import { SummaryProvider } from "./components/history/SummaryContext";

const ConversationPage = () => {
  return (
    <div className="flex justify-center w-full h-full overflow-hidden">
      <ChatHistoryProvider>
        <ResponseLoadingProvider>
          <SummaryProvider>
            <ConversationLayout />
          </SummaryProvider>
        </ResponseLoadingProvider>
      </ChatHistoryProvider>
    </div>
  );
};

export default ConversationPage;

export const metadata: Metadata = {
  title: "Chat - Echo Interview",
};
