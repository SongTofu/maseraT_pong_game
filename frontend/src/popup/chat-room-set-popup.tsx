import React, { useState } from "react";
import { socket } from "../App";

type Props = {
  chatRoomId: string | undefined;
  roomTitle: string;
  setIsRoomSet: React.Dispatch<React.SetStateAction<boolean>>;
};

// @ts-ignore
export function ChatRoomSetPopup({
  chatRoomId,
  roomTitle,
  setIsRoomSet
}: Props): JSX.Element {
  const [title, setTitle] = useState(roomTitle);
  const [password, setPassword] = useState("");

  // @ts-ignore
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // @ts-ignore
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClick = () => {
    socket.emit("chat-room-setting", { chatRoomId, title, password });
    setIsRoomSet(false);
  };

  return (
    <div
      style={{
        backgroundColor: "tomato",
        position: "fixed",
        margin: "auto",
        width: "300px",
        height: "300px",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, 0)"
      }}
    >
      <div>
        <label>방제목</label>
        <input type="text" value={title} onChange={onTitleChange}></input>
      </div>
      <div>
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={onPasswordChange}
        ></input>
      </div>
      <button onClick={onClick}>변경</button>
    </div>
  );
}
