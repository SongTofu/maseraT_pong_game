import React, { useState } from "react";
import { ChatRoomInfo } from "../type/chat-room-info";
import { getCookie } from "../../func/get-cookie";
import Popup from "reactjs-popup";
import { ChatPasswordPopup } from "../../popup/chat-password-popup";
import PopupControl from "../../popup/PopupControl";
import Button from "../button/Button";
import { socket } from "../../App";

export function ChatRoomList({ title, isPassword, chatRoomId }: ChatRoomInfo) {
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
    <div className="w-[90%] border-main border-[1px] rounded-sm bg-white flex justify-between items-center mt-2 first:mt-0 last:mb-2">
      <div className="flex items-center">
        <p className="px-2 py-1">{title}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="pr-5 text-sm">
          {!isPassword && <div className="text-black font-main">공개</div>}
          {isPassword && <div className="text-red-800 font-main">비공개</div>}
        </div>
        <div className="pr-1">
          {isPassword ? (
            <div>
              <Button
                tag={"입장"}
                onClick={() => {
                  onClick();
                  handleOptionChange(openModal);
                }}
              />
              {openModal && (
                <PopupControl
                  mainText="비밀 번호"
                  onClick={() => handleOptionChange(openModal)}
                >
                  <ChatPasswordPopup chatRoomId={chatRoomId} />
                </PopupControl>
              )}
            </div>
          ) : (
            <Button tag={"입장"} onClick={onClick} />
          )}
        </div>
      </div>
    </div>
  );
}
