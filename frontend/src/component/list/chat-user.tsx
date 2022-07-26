import { Authority } from "../../type/enum/authority.enum";
import { useState } from "react";
import { ChatPopup } from "../../popup/chat-popup";
import { ChatPopupType } from "../../type/chat-popup-type";

export function ChatUser({ participants }) {
  console.log("part", participants);
  const [chatPopup, setChatPopup] = useState<ChatPopupType>({
    id: 0,
    authority: 3
  });
  const [isClick, setIsClick] = useState(false);

  const onClick = (e, id, authority) => {
    setIsClick(curr => !curr);
    setChatPopup({ id, authority });
  };

  return (
    <div>
      {participants.map(participant => (
        <div
          key={participant.userId}
          onClick={e => {
            onClick(e, participant.userId, participant.authority);
          }}
        >
          <span>
            {participant.authority === Authority.OWNER ? "방장" : null}
            {participant.authority === Authority.ADMIN ? "관리자" : null}
            {participant.authority === Authority.PARTICIPANT ? "참여자" : null}
          </span>
          <span>{participant.nickname}</span>
        </div>
      ))}
      {isClick ? <ChatPopup user={chatPopup} setIsClick={setIsClick} /> : null}
    </div>
  );
}
