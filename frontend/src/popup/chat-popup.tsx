import { Authority } from "../type/enum/authority.enum";
import { getCookie } from "../func/get-cookie";
import { socket } from "../App";
import { ChatPopupType } from "../type/chat-popup-type";
import { Dispatch, SetStateAction } from "react";
import Popup from "reactjs-popup";
import { ProfilePopup } from "./profile-popup";

type userProps = {
  user: ChatPopupType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function ChatPopup({ user, setIsOpen }: userProps) {
  const { id, authority } = user;
  const chatRoomId = +localStorage.getItem("chatRoomId");
  const myAuthority = +localStorage.getItem("authority");

  // 내 프로필 넣기
  if (id === +getCookie("id")) return <div></div>;

  const onSetAdmin = () => {
    const isAdmin: boolean = Authority.ADMIN !== authority;

    socket.emit("chat-room-set-admin", {
      chatRoomId: chatRoomId,
      isAdmin,
      userId: id
    });
    setIsOpen(false);
  };

  const onKick = () => {
    socket.emit("chat-room-kick", {
      targetId: id,
      chatRoomId: +localStorage.getItem("chatRoomId")
    });
    setIsOpen(false);
  };
  return (
    <div>
      {myAuthority >= Authority.OWNER ? (
        <button onClick={onSetAdmin}>
          {authority === Authority.ADMIN ? "관리자 해임" : "관리자 임명"}
        </button>
      ) : null}
      {myAuthority >= Authority.ADMIN && myAuthority >= authority ? (
        <button onClick={onKick}>강퇴</button>
      ) : null}
      {myAuthority >= Authority.ADMIN && myAuthority >= authority ? (
        <button>채팅 금지</button>
      ) : null}
      <Popup trigger={<button>프로필</button>}>
        <ProfilePopup userId={id} />
      </Popup>

      <button>게임 신청</button>
    </div>
  );
}
