import React from "react";
import ButtonTwo from "../Button/ButtonTwo";

interface IChatRoomL {
  title: string;
  passwd: boolean;
  roomId: number;
}

function ChatRoomList({ title, passwd, roomId }: IChatRoomL): JSX.Element {
  return (
    <div className="w-[90%] border-main border-[1px] rounded-sm bg-white flex justify-between items-center mt-2 first:mt-0 last:mb-2">
      <div>
        <p className="px-2 py-1">{title}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="pr-5 text-sm">
          {!passwd && <div className="text-black font-main">공개</div>}
          {passwd && <div className="text-red-800 font-main">비공개</div>}
        </div>
        <div className="pr-1">
          <ButtonTwo
            tag="입장"
            className="text-xs"
            navlink={`/chat-room/${roomId}`}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatRoomList;
