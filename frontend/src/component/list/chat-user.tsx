import { Authority } from "../../type/enum/authority.enum";
import React, { useState } from "react";
import { ChatPopup } from "../../popup/chat-popup";
import { ChatPopupType } from "../../type/chat-popup-type";
import { ChatParticipantType } from "../../type/chat-participant-type";
import Admin from "../../img/admin.svg";
import Owner from "../../img/owner.svg";

type ChatParticipantPropsType = {
  participants: ChatParticipantType[] | null;
};

export function ChatUser({
  participants
}: ChatParticipantPropsType): JSX.Element {
  const [up, setup] = useState<ChatPopupType>({
    id: 0,
    authority: 3
  });
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
    authority: Authority
  ) => {
    setup({ id, authority });
    handleOptionChange(isOpen);
  };
  const handleOptionChange = (val: boolean) => {
    setIsOpen(!val);
  };

  return (
    <div className="relative flex flex-col">
      {participants
        ? participants.map((participant: ChatParticipantType) => (
            <button
              className="relative"
              key={participant.userId}
              onClick={e => {
                onClick(e, participant.userId, participant.authority);
              }}
            >
              <span className="mr-2 flex flex-row justify-center items-center">
                {participant.authority === Authority.OWNER ? (
                  <img
                    src={Owner}
                    alt="owner"
                    className="w-[15px] h-[13px] mr-1"
                  />
                ) : null}
                {participant.authority === Authority.ADMIN ? (
                  <img
                    src={Admin}
                    alt="admin"
                    className="w-[15px] h-[13px] mr-1"
                  />
                ) : null}
                {participant.nickname}
              </span>
            </button>
          ))
        : null}
      {isOpen ? <ChatPopup user={up} setIsOpen={setIsOpen} /> : null}
    </div>
  );
}
