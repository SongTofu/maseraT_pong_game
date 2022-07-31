import { useState } from "react";
import { socket } from "../App";
import { getCookie } from "../func/get-cookie";

export function ChatPasswordPopup({ chatRoomId }) {
  const [password, setPassword] = useState("");

  const onChange = e => {
    setPassword(e.target.value);
  };

  const onClick = () => {
    socket.emit("chat-room-join", {
      chatRoomId: chatRoomId,
      title: "",
      password: password,
      userId: getCookie("id")
    });
  };

  return (
    <div>
      <input type="text" onChange={onChange} value={password}></input>
      <button onClick={onClick}>입장</button>
    </div>
  );
}
