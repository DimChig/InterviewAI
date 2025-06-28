import React from "react";
import MessageItemContainer from "./MessageItemContainer";
import { Message } from "@/app/types/messages";

interface Props {
  message: Message;
}

const MessageItemBot = ({ message }: Props) => {
  return (
    <MessageItemContainer className="rounded-bl-none bg-transparent text-start border-border border-[1px]">
      {message.text}
    </MessageItemContainer>
  );
};

export default MessageItemBot;
