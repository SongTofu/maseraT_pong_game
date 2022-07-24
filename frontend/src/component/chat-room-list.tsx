import { ChatRoomInfo } from "../type/chat-room-info";
import { socket } from "../App";

export function ChatRoomList({ title, isPassword, chatRoomId }: ChatRoomInfo) {
  const onClick = () => {
    socket.emit("chat-room-join", { chatRoomId, title, userId: 2 });
  };
  return (
    <div>
      <span>{title}</span>
      <span>{isPassword ? "비공개" : "공개"}</span>
      <button onClick={onClick}>입장</button>
    </div>
  );
}
