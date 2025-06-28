import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const MessageItemContainer = ({ children, className }: Props) => {
  return (
    <div className={cn("rounded-xl p-3 text-lg w-fit max-w-3/4", className)}>
      {children}
    </div>
  );
};

export default MessageItemContainer;
