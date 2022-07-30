import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChatParticipantType } from "../type/chat-participant-type";
import { Chat } from "../component/chat";
import { ChatType } from "../type/chat-type";
import { socket } from "../App";
import { getCookie } from "../func/get-cookie";
import { UserList } from "../component/list/user-list";
import { Authority } from "../type/enum/authority.enum";
import { ChatRoomSetPopup } from "../popup/chat-room-set-popup";

export function ChatDetail() {
  const { chatRoomId } = useParams();
  const [participants, setParticipants] = useState<ChatParticipantType[]>([]);
  const [title, setTitle] = useState("");
  const [chats, setChats] = useState<ChatType[]>([]);
  const [message, setMessage] = useState("");
  const [authority, setAuthority] = useState(Authority.PARTICIPANT);
  const [isRoomSet, setIsRoomSet] = useState(false);

  const navigate = useNavigate();

  const ref = useRef(null);

  const onSideClick = e => {
    if (!ref.current.contains(e.target)) setIsRoomSet(false);
  };

  useEffect(() => {
    localStorage.setItem("chatRoomId", chatRoomId);

    fetch(process.env.REACT_APP_API_URL + "chat/room/" + chatRoomId, {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        setParticipants(json.chatParticipant);
        json.chatParticipant.forEach(participant => {
          if (participant.userId === +getCookie("id")) {
            localStorage.setItem("authority", participant.authority);
            setAuthority(participant.authority);
          }
        });
        setTitle(json.title);
      });

    window.addEventListener("click", onSideClick);

    return () => {
      socket.emit("chat-room-leave", { chatRoomId, userId: getCookie("id") });
      localStorage.removeItem("authority");
      window.removeEventListener("click", onSideClick);
    };
  }, [chatRoomId, navigate]);

  useEffect(() => {
    socket.on("chat-room-leave", ({ nickname, userId }) => {
      setParticipants(curr =>
        curr.filter(idx => {
          return +idx.userId !== +userId;
        })
      );

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
      setParticipants(curr => {
        return [
          ...curr,
          {
            nickname: participant.nickname,
            userId: participant.userId,
            authority: participant.authority
          }
        ];
      });

      setChats(curr => {
        return [
          ...curr,
          {
            nickname: "",
            message: participant.nickname + "(이)가 입장했습니다."
          }
        ];
      });
    });

    socket.on("chat-room-set-admin", ({ userId, authority }) => {
      if (userId === +getCookie("id")) {
        localStorage.setItem("authority", authority);
        setAuthority(authority);
      }

      setParticipants(curr => {
        curr.forEach(participant => {
          if (+participant.userId === userId) participant.authority = authority;
        });
        curr.sort((a, b) => b.authority - a.authority);
        return [...curr];
      });
    });

    socket.on("chat-room-kick", ({ targetId }) => {
      if (targetId === getCookie("id")) {
        navigate("/chat");
      }
      setParticipants(curr => curr.filter(c => c.userId !== targetId));
    });

    socket.on("chat-room-setting", ({ title }) => {
      setTitle(title);
    });

    return () => {
      socket.off("chat-room-leave");
      socket.off("chat-room-message");
      socket.off("chat-room-join");
      socket.off("chat-room-set-admin");
      socket.off("chat-room-kick");
    };
  }, [participants, chats, navigate]);

  const onClick = () => {
    socket.emit("chat-room-message", {
      chatRoomId,
      userId: getCookie("id"),
      message
    });
    setMessage("");
  };

  const onChange = e => {
    setMessage(e.target.value);
  };

  const onRoomSet = () => {
    setIsRoomSet(true);
  };

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <h2>Participant</h2>
        <UserList isChatRoom={true} participants={participants} />
        <div ref={ref}>
          {authority >= Authority.ADMIN ? (
            <button onClick={onRoomSet}>설정</button>
          ) : null}
          {isRoomSet ? (
            <ChatRoomSetPopup
              chatRoomId={chatRoomId}
              roomTitle={title}
              setIsRoomSet={setIsRoomSet}
            />
          ) : null}
        </div>
        <button>나가기</button>
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
