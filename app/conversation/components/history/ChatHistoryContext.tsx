"use client";
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from "react";
import { ChatHistory, Message } from "@/app/types/messages";

interface ChatHistoryContextValue {
  /** The ChatHistory instance */
  history: ChatHistory;
  /** Current list of messages */
  messages: Message[];
  /** Add a message and re-render */
  addMessage: (msg: Message) => void;
  /** Clear all messages */
  clearHistory: () => void;
}

const ChatHistoryContext = createContext<ChatHistoryContextValue | undefined>(
  undefined
);

export const ChatHistoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // single ChatHistory instance
  const historyRef = useRef<ChatHistory>(new ChatHistory());
  // local state mirrors history.all for re-renders
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (msg: Message) => {
    historyRef.current.add(msg);
    setMessages([...historyRef.current.all]);
  };

  const clearHistory = () => {
    historyRef.current.clear();
    setMessages([]);
  };

  return (
    <ChatHistoryContext.Provider
      value={{
        history: historyRef.current,
        messages,
        addMessage,
        clearHistory,
      }}
    >
      {children}
    </ChatHistoryContext.Provider>
  );
};

/**
 * Hook to access ChatHistoryContext.
 * Must be used under <ChatHistoryProvider>.
 */
export function useChatHistory(): ChatHistoryContextValue {
  const ctx = useContext(ChatHistoryContext);
  if (!ctx) {
    throw new Error(
      "useChatHistory must be used within a <ChatHistoryProvider>"
    );
  }
  return ctx;
}
