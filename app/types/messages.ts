import { ChessRating } from "./chess";

/**
 * Analysis data attached to user messages.
 */
export interface UserMessageAnalysis {
  feedback: string;
  chessRating: ChessRating;
  bestResponse: string;
}

/**
 * Discriminator for message origin.
 */
export type MessageType = "bot" | "user";

/**
 * Unified message type for both bot and user.
 */
export interface Message {
  /** 'bot' for messages from the system, 'user' for user messages */
  type: MessageType;
  id: string;
  text: string;
  /** Present only on user messages when analysis is available */
  analysis?: UserMessageAnalysis;
}

/**
 * A simple history container for chat messages.
 */
export class ChatHistory {
  private messages: Message[] = [];

  /** Get all messages so far */
  public get all(): Message[] {
    return this.messages;
  }

  /** Push a new message (bot or user) onto the history */
  public add(msg: Message) {
    this.messages.push(msg);
  }

  /** Clear the history */
  public clear() {
    this.messages = [];
  }
}
