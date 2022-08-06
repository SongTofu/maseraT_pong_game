import { useState } from "react";
import { socket } from "../App";
import Button from "../component/button/Button";

export function ChatRoomSetPopup({ chatRoomId, roomTitle, setIsRoomSet }) {
  const [title, setTitle] = useState(roomTitle);
  const [password, setPassword] = useState("");

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onClick = () => {
    socket.emit("chat-room-setting", { chatRoomId, title, password });
    setIsRoomSet(false);
  };

  return (
    <div className="w-[300px] h-[300px] flex flex-col justify-center">
      <div>
        <label>방제목</label>
        <input
          className="border-2 rounded-md w-full my-2"
          type="text"
          value={title}
          onChange={onTitleChange}
        ></input>
        <label>비밀번호</label>
        <input
          className="border-2 rounded-md w-full my-2"
          type="password"
          value={password}
          onChange={onPasswordChange}
        ></input>
      </div>
      <Button tag={"변경"} className={"btn-lg mt-8"} onClick={onClick} />
    </div>
  );
}
