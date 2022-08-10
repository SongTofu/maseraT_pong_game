import React, { useState } from "react";
import { ChatRoomInfo } from "../../type/chat-room-info";
import { getCookie } from "../../func/cookieFunc";
import { ChatPasswordPopup } from "../../popup/chat-password-popup";
import PopupControl from "../../popup/PopupControl";
import Button from "../button/Button";
import { socket } from "../../App";

export function ChatRoomList({
  title,
  isPassword,
  chatRoomId
}: ChatRoomInfo): JSX.Element {
  const [openModal, setOpenModal] = useState(false);

  const onClick = () => {
    if (!isPassword) {
      socket.emit("chat-room-join", {
        chatRoomId,
        title,
        userId: getCookie("id")
      });
    }
  };

  const handleOptionChange = (val: boolean) => {
    setOpenModal(!val);
  };

  return (
    <div className="flex border-[1px] p-1 w-[500px] flex-row justify-between items-center border-main rounded-sm mb-2">
      <div className="pl-2">{title}</div>
      <div className="flex justify-between items-center w-[150px]">
        <div
          className={`font-main ${isPassword ? "text-red-800" : "text-black"}`}
        >
          {isPassword ? "비공개" : "공개"}
        </div>
        <div className="pr-1">
          <Button
            tag={"입장"}
            onClick={() => {
              onClick();
              isPassword && handleOptionChange(openModal);
            }}
          />
          {isPassword && openModal && (
            <PopupControl
              mainText="비밀 번호"
              onClick={() => handleOptionChange(openModal)}
            >
              <ChatPasswordPopup chatRoomId={chatRoomId} />
            </PopupControl>
          )}
        </div>
      </div>
    </div>
  );
}
