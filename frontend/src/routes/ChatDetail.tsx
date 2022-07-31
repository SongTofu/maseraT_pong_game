import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChatParticipantType } from "../type/chat-participant-type";
import { Chat } from "../component/chat";
import { ChatType } from "../type/chat-type";
import { socket } from "../App";
import { getCookie } from "../func/get-cookie";
import { Authority } from "../type/enum/authority.enum";
import { UserList } from "../component/list/user-list";

export function ChatDetail() {
  const { chatRoomId } = useParams();
  const [participants, setParticipants] = useState<ChatParticipantType[]>([]);
  const [title, setTitle] = useState("");
  const [chats, setChats] = useState<ChatType[]>([]);
  const [message, setMessage] = useState("");
  const [authority, setAuthority] = useState(Authority.PARTICIPANT);

  const navigate = useNavigate();

  useEffect(() => {
    if (chatRoomId) {
      localStorage.setItem("chatRoomId", chatRoomId);
    }

    fetch("http://localhost:3000/chat/room/" + chatRoomId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        setParticipants(json.chatParticipant);
        json.chatParticipant.forEach((element: any) => {
          if (element.userId === +getCookie("id")) {
            setAuthority(element.authority);
          }
        });
        setTitle(json.title);
      });

    socket.on("chat-room-destroy", (data) => {
      if (data.chatRoomId === chatRoomId) navigate("/chat");
    });

    return () => {
      socket.emit("chat-room-leave", { chatRoomId, userId: getCookie("id") });
      socket.off("chat-room-destroy");
    };
  }, [chatRoomId, navigate]);

  useEffect(() => {
    socket.on("chat-room-leave", ({ nickname, userId }) => {
      setParticipants((curr) =>
        curr.filter((idx) => {
          return +idx.userId !== +userId;
        }),
      );

      setChats((curr) => {
        return [
          ...curr,
          { nickname: "", message: nickname + "(이)가 나갔습니다" },
        ];
      });
    });

    socket.on("chat-room-message", (chatType: ChatType) => {
      setChats((curr) => [...curr, chatType]);
    });

    socket.on("chat-room-join", (participant: ChatParticipantType) => {
      setParticipants((curr) => [...curr, participant]);

      setChats((curr) => {
        return [
          ...curr,
          {
            nickname: "",
            message: participant.nickname + "(이)가 입장했습니다.",
          },
        ];
      });
    });

    socket.on("chat-room-set-admin", ({ userId, authority }) => {
      // socket.on("chat-room-set-admin", data => {
      console.log("set admin");
      if (userId === getCookie("id")) setAuthority(authority);

      setParticipants((curr) => {
        curr.forEach((participant) => {
          if (participant.userId === userId) participant.authority = authority;
        });
        curr.sort((a, b) => a.authority - b.authority);
        return [...curr];
      });
    });

    return () => {
      socket.off("chat-room-leave");
      socket.off("chat-room-message");
      socket.off("chat-room-join");
      socket.off("chat-room-set-authority");
    };
  }, [participants, chats]);

  const onClick = () => {
    socket.emit("chat-room-message", {
      chatRoomId,
      userId: getCookie("id"),
      message,
    });
    setMessage("");
  };
  console.log(participants);

  const onChange = (e: any) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <h2>Participant</h2>
        <UserList isChatRoom={true} />
        <h2>채팅</h2>
        <ul>
          {chats.map((chat, index) => {
            return (
              <Chat key={index} nickname={chat.nickname} msg={chat.message} />
            );
          })}
        </ul>
        <input type="text" onChange={onChange} value={message} />
        <button onClick={onClick}>전송</button>
      </div>
    </div>
  );
}
