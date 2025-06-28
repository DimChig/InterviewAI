import React from "react";
import MessageItemContainer from "./MessageItemContainer";
import { Message } from "@/app/types/messages";
import HighlightText from "./HighlightText";
import { censorWords } from "./censor";

interface Props {
  message: Message;
}

const MessageItemBot = ({ message }: Props) => {
  return (
    <MessageItemContainer className="rounded-bl-none bg-transparent text-start border-border border-[1px]">
      <HighlightText text={censorWords(message.text)} />
    </MessageItemContainer>
  );
};

export default MessageItemBot;
