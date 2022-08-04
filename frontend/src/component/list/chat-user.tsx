/* eslint-disable react/jsx-no-comment-textnodes */
import { Authority } from "../../type/enum/authority.enum";
import { useState, useEffect, useRef } from "react";
import { ChatPopup } from "../../popup/chat-popup";
import { ChatPopupType } from "../../type/chat-popup-type";
import { ChatParticipantType } from "../../type/chat-participant-type";
import Admin from "../../img/admin.svg";
import Owner from "../../img/owner.svg";

type ChatParticipantPropsType = {
  participants: ChatParticipantType[] | null;
};

// @ts-ignore
export function ChatUser({
  participants
}: ChatParticipantPropsType): JSX.Element {
  const [chatPopup, setChatPopup] = useState<ChatPopupType>({
    id: 0,
    authority: 3
  });
  const [isOpen, setIsOpen] = useState(false);

  // @ts-ignore
  const onClick = (id, authority) => {
    setIsOpen(curr => !curr);
    setChatPopup({ id, authority });
  };

  const ref = useRef(null);

  // @ts-ignore
  const onOutSideClick = e => {
    // @ts-ignore
    if (!ref.current.contains(e.target)) setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", onOutSideClick);
    return () => {
      window.removeEventListener("click", onOutSideClick);
    };
  }, []);

  return (
    <div ref={ref}>
      {/* @ts-ignore */}
      {participants.map((participant: ChatParticipantType) => (
        <div
          key={participant.userId}
          onClick={e => {
            onClick(participant.userId, participant.authority);
          }}
          className="flex"
        >
          {participant.authority === Authority.OWNER ? (
            <img src={Owner} alt="owner" />
          ) : null}
          {participant.authority === Authority.ADMIN ? (
            <img src={Admin} alt="admin" />
          ) : null}
          {participant.nickname}
        </div>
      ))}
      {isOpen ? <ChatPopup user={chatPopup} setIsOpen={setIsOpen} /> : null}
    </div>
  );
}
