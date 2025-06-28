import React from "react";
import MessageItemContainer from "./MessageItemContainer";
import { Message } from "@/app/types/messages";

interface Props {
  message: Message;
}

const MessageItemUser = ({ message }: Props) => {
  return (
    <div className="flex w-full justify-end">
      <MessageItemContainer className="rounded-br-none bg-slate-200/50">
        {message.text}
      </MessageItemContainer>
    </div>
  );
};

export default MessageItemUser;
