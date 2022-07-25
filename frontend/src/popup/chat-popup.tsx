import { Authority } from "../type/enum/authority.enum";
import { getCookie } from "../func/get-cookie";
import { socket } from "../App";
import { SetAdminType } from "../type/set-admin-type";

export function ChatPopup({ id, authority, chatRoomId }) {
  if (id === +getCookie("id")) return <div></div>;

  console.log("chatRoomId", chatRoomId);
  const onSetAdmin = () => {
    const setAdmin: SetAdminType = {
      chatRoomId: chatRoomId,
      isAdmin: true,
      userId: id
    };
    socket.emit("chat-room-set-admin", {
      chatRoomId: chatRoomId,
      isAdmin: true,
      userId: id
    });
  };

  return (
    <div>
      {authority >= Authority.OWNER ? (
        <button onClick={onSetAdmin}>관리자 임명</button>
      ) : null}
      {authority >= Authority.ADMIN ? <button>강퇴</button> : null}
      {authority >= Authority.ADMIN ? <button>채팅 금지</button> : null}
      <button>프로필</button>
      <button>전적</button>
      <button>차단</button>
      <button>친구</button>
    </div>
  );
}
