import { ChatRoomList } from "../component/list/chat-room-list";
import { useState, useEffect } from "react";
import { ChatRoomInfo } from "../type/chat-room-info";
import { socket } from "../App";
import { useNavigate } from "react-router-dom";
import { Popup } from "reactjs-popup";
import { ChatCreatePopup } from "../popup/chat-create-popup";
import { UserList } from "../component/list/user-list";
import { getCookie } from "../func/get-cookie";

export function ChatMain() {
  const [rooms, setRooms] = useState<ChatRoomInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("connect-user", { userId: getCookie("id") });

    fetch(process.env.REACT_APP_API_URL + "chat/room", {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        setRooms(json);
      });

    socket.on("chat-room-join", (chatRoomInfo: ChatRoomInfo) => {
      navigate("/chat/" + chatRoomInfo.chatRoomId);
    });
    return () => {
      socket.off("chat-room-join");
    };
  }, [navigate]);

  useEffect(() => {
    socket.on("chat-room-create", (chatRoomInfo: ChatRoomInfo) => {
      setRooms(curr => {
        return [...curr, chatRoomInfo];
      });
    });

    socket.on("chat-room-destroy", ({ chatRoomId }) => {
      setRooms(curr =>
        curr.filter(idx => {
          return idx.chatRoomId !== +chatRoomId;
        })
      );
    });

    socket.on("chat-room-setting", ({ chatRoomId, title }) => {
      setRooms(currRooms => {
        return currRooms.map(currRoom => {
          if (currRoom.chatRoomId === +chatRoomId) currRoom.title = title;
          return currRoom;
        });
      });
    });

    return () => {
      socket.off("chat-room-create");
      socket.off("chat-room-destroy");
      socket.off("chat-room-setting");
    };
  }, [rooms]);

  return (
    <div>
      <h1>chatroom</h1>
      <Popup trigger={<button> 방생성 </button>} position="right center">
        <ChatCreatePopup />
      </Popup>
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
      <h1>user list</h1>
      <UserList isChatRoom={false} participants="" />
    </div>
  );
}
