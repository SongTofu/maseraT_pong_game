import { ChatRoomList } from "../component/chat-room-list";
import { useState, useEffect } from "react";
import { ChatRoomInfo } from "../type/chat-room-info";
import { socket } from "../App";

export function Chat() {
  const [rooms, setRooms] = useState<ChatRoomInfo[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/chat/room", {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        setRooms(json);
      });

    socket.emit("connect-user", { userId: 2 });

    socket.on("chat-room-join", (chatRoomInfo: ChatRoomInfo) => {
      setRooms(curr => {
        if (curr.find(c => c.chatRoomId === chatRoomInfo.chatRoomId)) {
          return [...curr];
        } else {
          return [...curr, chatRoomInfo];
        }
      });
    });
  }, []);

  return (
    <div>
      <h1>chatroom</h1>
      {rooms.map(room => {
        return (
          <ChatRoomList
            key={room.chatRoomId}
            chatRoomId={room.chatRoomId}
            title={room.title}
            isPassword={room.isPassword}
          />
        );
      })}
    </div>
  );
}
