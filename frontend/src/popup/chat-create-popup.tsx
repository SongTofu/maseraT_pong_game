import { useState } from "react";
import { socket } from "../App";
import { getCookie } from "../func/get-cookie";

export function ChatCreatePopup() {
  const [title, setTitle] = useState("");
  const [password, setPaasword] = useState("");

  const onClick = () => {
    socket.emit("chat-room-join", {
      chatRoomId: 0,
      title,
      password,
      userId: getCookie("id")
    });
  };

  const onTitleChange = e => {
    setTitle(e.target.value);
  };

  const onPasswordChagne = e => {
    setPaasword(e.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "Black"
      }}
    >
      <div>
        {" "}
        <label style={{ color: "White" }}>방제목</label>
        <input onChange={onTitleChange} value={title} />
      </div>

      <label style={{ color: "White" }}>비밀번호</label>
      <input onChange={onPasswordChagne} value={password} />
      <button onClick={onClick}>방생성</button>
    </div>
  );
}
