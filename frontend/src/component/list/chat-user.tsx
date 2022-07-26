import { useState, useEffect } from "react";
import { ChatParticipantType } from "../../type/chat-participant-type";
import { Authority } from "../../type/enum/authority.enum";

export function ChatUser() {
  const [users, setUsers] = useState<ChatParticipantType[]>([]);

  useEffect(() => {
    console.log(localStorage.getItem("chatRoomId"));
    fetch(
      process.env.REACT_APP_API_URL +
        "chat/participant/" +
        localStorage.getItem("chatRoomId"),
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(json => setUsers(json));
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.userId}>
          <span>
            {user.authority === Authority.OWNER ? "방장" : null}
            {user.authority === Authority.ADMIN ? "관리자" : null}
            {user.authority === Authority.PARTICIPANT ? "참여자" : null}
          </span>
          <span>{user.nickname}</span>
        </div>
      ))}
    </div>
  );
}
