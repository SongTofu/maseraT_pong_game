import React from "react";

export function Chat({ nickname, msg }: any) {
  return (
    <li>
      {nickname}
      {nickname ? ": " : ""}
      {msg}
    </li>
  );
}
