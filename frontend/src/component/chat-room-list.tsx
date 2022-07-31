import React from "react";
import { ChatRoomInfo } from "../type/chat-room-info";
import { socket } from "../App";
import { getCookie } from "../func/get-cookie";
import Popup from "reactjs-popup";
import { ChatPasswordPopup } from "../popup/chat-password-popup";

export function ChatRoomList({ title, isPassword, chatRoomId }: ChatRoomInfo) {
  const onClick = () => {
    socket.emit("chat-room-join", {
      chatRoomId,
      title,
      userId: getCookie("id"),
    });
  };
  return (
    <div>
      <span>{title}</span>
      <span>{isPassword ? "비공개" : "공개"}</span>
      {isPassword ? (
        <Popup trigger={<button onClick={onClick}>입장</button>}>
          <ChatPasswordPopup chatRoomId={chatRoomId} />
        </Popup>
      ) : (
        <button onClick={onClick}>입장</button>
      )}
    </div>
  );
}
