import { useState } from "react";
import { socket } from "../App";
import Button from "../component/button/Button";
import { getCookie } from "../func/cookieFunc";

type Props = {
  chatRoomId: number;
};

// @ts-ignore
export function ChatPasswordPopup({ chatRoomId }: Props): JSX.Element {
  const [password, setPassword] = useState("");

  // @ts-ignore
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
    <div className="p-10 flex items-center">
      <input
        className="border-2 rounded-sm p-1"
        type="password"
        onChange={onChange}
        value={password}
      />
      <Button tag={"입장"} className={"btn-sm ml-2"} onClick={onClick} />
    </div>
  );
}
