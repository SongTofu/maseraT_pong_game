import { useState } from "react";
import { socket } from "../App";
import { getCookie } from "../func/get-cookie";

export function GameCreatePopup() {
  const [title, setTitle] = useState("");
  const [check, setCheck] = useState(false);

  const onChange = e => {
    setTitle(e.target.value);
  };

  const onClick = () => {
    socket.emit("game-room-join", {
      gameRoomId: 0,
      title,
      userId: getCookie("id"),
      isSpeedMode: check,
      isLadder: false
    });
  };

  const onCheck = e => {
    setCheck(curr => !curr);
  };

  return (
    <div style={{ backgroundColor: "tomato", width: "200px", height: "100px" }}>
      <label>방제목</label>
      <input value={title} onChange={onChange}></input>
      <label>스피드 모드</label>
      <input type="checkbox" onChange={onCheck} />
      <button onClick={onClick}>생성</button>
    </div>
  );
}
