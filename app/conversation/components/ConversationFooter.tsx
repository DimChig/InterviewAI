import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import React from "react";

const ConversationFooter = () => {
  return (
    <div className="flex w-full h-full items-center justify-between p-4 pt-0 bg-transparent">
      <div className="flex w-full relative">
        <Textarea placeholder="Type your message here." className="pe-14" />
        <Button
          className="absolute rounded-full right-3 bottom-3"
          size={"icon"}
        >
          <ArrowUp className="min-w-5 min-h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ConversationFooter;
