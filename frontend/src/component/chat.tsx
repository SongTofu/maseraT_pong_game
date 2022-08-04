import React from "react";
import { ChatType } from "../type/chat-type";

export function Chat({ nickname, message }: ChatType): JSX.Element {
  return (
    <li>
      {nickname}
      {nickname ? ": " : ""}
      {message}
    </li>
  );
}
