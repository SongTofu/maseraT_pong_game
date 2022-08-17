import React from "react";
import { useState } from "react";
import { socket } from "../App";
import Button from "../component/button/Button";
import { getCookie } from "../func/cookieFunc";

export function ChatCreatePopup(): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onClick = () => {
    socket.emit("chat-room-join", {
      chatRoomId: 0,
      title,
      password,
      userId: getCookie("id")
    });
  };

  const onTitleChange = (e: any) => {
    if (e.target.value.length < 13) setTitle(e.target.value);
  };

  const onPasswordChagne = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <div className="flex flex-col mb-2 w-full">
        <label className="py-1">방제목</label>
        <input
          className="border-2 rounded-md p-1"
          onChange={onTitleChange}
          value={title}
        />
      </div>
      <div className="flex flex-col mb-2 w-full">
        <label className="py-1">비밀번호</label>
        <input
          className="border-2 rounded-md p-1"
          type={"password"}
          onChange={onPasswordChagne}
          value={password}
        />
      </div>
      <Button tag={"방생성"} className={"btn-lg mt-10"} onClick={onClick} />
    </div>
  );
}
