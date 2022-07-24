import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChatParticipantType } from "../type/chat-participant-type";
import { ChatParticipant } from "../component/chat-participant";
import { Chat } from "../component/chat";
import { ChatType } from "../type/chat-type";
import { socket } from "../App";
import { getCookie } from "../func/get-cookie";

export function ChatDetail() {
  const { chatRoomId } = useParams();
  const [participants, setParticipants] = useState<ChatParticipantType[]>([]);
  const [title, setTitle] = useState("");
  const [chats, setChats] = useState<ChatType[]>([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/chat/room/" + chatRoomId, {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        setParticipants(json.chatParticipant);
        setTitle(json.title);
      });

    socket.on("chat-room-destroy", () => {
      navigate("/chat");
    });

    return () => {
      socket.emit("chat-room-leave", { chatRoomId, userId: getCookie("id") });
      socket.off("chat-room-destroy");
    };
  }, [chatRoomId, navigate]);

  useEffect(() => {
    socket.on("chat-room-leave", ({ nickname, userId }) => {
      setParticipants(curr => curr.filter(idx => idx.userId !== userId));

      setChats(curr => {
        return [
          ...curr,
          { nickname: "", message: nickname + "(이)가 나갔습니다" }
        ];
      });
    });

    socket.on("chat-room-message", (chatType: ChatType) => {
      setChats(curr => [...curr, chatType]);
    });

    socket.on("chat-room-join", (participant: ChatParticipantType) => {
      setParticipants(curr => [...curr, participant]);
    });

    return () => {
      socket.off("chat-room-leave");
      socket.off("chat-room-message");
      socket.off("chat-room-join");
    };
  }, [participants, chats]);

  const onClick = () => {
    socket.emit("chat-room-message", {
      chatRoomId,
      userId: getCookie("id"),
      message
    });
    setMessage("");
  };
  console.log(participants);

  const onChange = e => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <h2>Participant</h2>
        <ul>
          {participants.map(participant => {
            return (
              <ChatParticipant
                key={participant.userId}
                userId={participant.userId}
                authority={participant.authority}
                nickname={participant.nickname}
              />
            );
          })}
        </ul>
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
        {/* <button onClick={onClick2}>test</button> */}
      </div>
    </div>
  );
}
