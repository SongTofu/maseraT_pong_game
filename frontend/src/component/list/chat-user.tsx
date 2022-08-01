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
  ReactPortal
} from "react";
import { ChatPopup } from "../../popup/chat-popup";
import { ChatPopupType } from "../../type/chat-popup-type";
import { socket } from "../../App";
import Admin from "../../img/admin.svg";
import Owner from "../../img/owner.svg";

// @ts-ignore
export function ChatUser({ participants }) {
  const [chatPopup, setChatPopup] = useState<ChatPopupType>({
    id: 0,
    authority: 3
  });
  const [isOpen, setIsOpen] = useState(false);

  // @ts-ignore
  const onClick = (e, id, authority) => {
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
      {participants.map(
        (participant: {
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
        }) => (
          <div
            key={participant.userId}
            onClick={e => {
              onClick(e, participant.userId, participant.authority);
            }}
            className="flex"
          >
            {/* {participant.authority === Authority.OWNER ? "방장" : null}
              {participant.authority === Authority.ADMIN ? "관리자" : null}
              {participant.authority === Authority.PARTICIPANT
                ? "참여자"
                : null} */}
            {participant.authority === Authority.OWNER ? (
              <img src={Owner} alt="owner" />
            ) : null}
            {participant.authority === Authority.ADMIN ? (
              <img src={Admin} alt="admin" />
            ) : null}
            {/* {participant.authority === Authority.PARTICIPANT
                ? <img src={} alt="participant" />
                : null} */}
            {participant.nickname}
          </div>
        )
      )}
      {isOpen ? <ChatPopup user={chatPopup} setIsOpen={setIsOpen} /> : null}
    </div>
  );
}
