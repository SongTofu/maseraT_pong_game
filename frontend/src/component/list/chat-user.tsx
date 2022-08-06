/* eslint-disable react/jsx-no-comment-textnodes */
import { Authority } from "../../type/enum/authority.enum";
import {
  useState,
  useEffect,
  useRef,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import { ChatPopup } from "../../popup/chat-popup";
import { upType } from "../../type/chat-popup-type";
import { socket } from "../../App";
import PopupControl from "../../popup/PopupControl";

export function ChatUser({ participants }) {
  const [up, setup] = useState<upType>({
    id: 0,
    authority: 3,
  });
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (e, id, authority) => {
    setup({ id, authority });
    handleOptionChange(isOpen);
  };
  const handleOptionChange = (val: boolean) => {
    setIsOpen(!val);
  };

  return (
    <div className="relative">
      {/* {participants.map( */}
      {/* (participant: {
          userId: Key | null | undefined;
          authority: Authority;
          nickname:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
        }) => ( */}
      <button
        className="relative"
        // key={participant.userId}
        // onClick={(e) => {
        //   onClick(e, participant.userId, participant.authority);
        onClick={() => {
          handleOptionChange(isOpen);
        }}
        // }}
      >
        <span className="mr-2">
          관리자
          {/* {participant.authority === Authority.OWNER ? "방장" : null}
          {participant.authority === Authority.ADMIN ? "관리자" : null}
          {participant.authority === Authority.PARTICIPANT ? "참여자" : null} */}
        </span>
        <span>participant.nickname</span>
      </button>
      {/* ), */}
      {/* )} */}
      {isOpen ? <ChatPopup user={up} setIsOpen={setIsOpen} /> : null}
    </div>
  );
}
