import React from "react";
import ButtonTwo from "./ButtonTwo";

interface IProps {
  status: boolean;
  isGame: boolean;
}

function RoomComponent({ status, isGame }: IProps) {
  return (
    <div className="w-[90%] border-main border-[1px] rounded-sm bg-white flex justify-between items-center mt-2 first:mt-0 last:mb-2">
      <div>
        <p className="px-2 py-1">title</p>
      </div>
      <div className="flex justify-between items-center">
        {!isGame && (
          <div className="pr-5 text-sm">
            {status && <div className="text-black font-main">공개</div>}
            {!status && <div className="text-red-800 font-main">비공개</div>}
          </div>
        )}
        <div className="pr-5 text-sm">{1}명</div>
        {isGame && (
          <div className="pr-5 text-sm">
            {status && <div className="text-yellow-500 font-main">대기중</div>}
            {!status && <div className="text-gray-500 font-main">게임중</div>}
          </div>
        )}
        {isGame && (
          <div className="pr-1">
            {status && (
              <ButtonTwo tag="입장" className="text-xs" navlink="/game-room" />
            )}
            {!status && (
              <ButtonTwo tag="관전" className="text-xs" navlink="/game-room" />
            )}
          </div>
        )}
        {!isGame && (
          <div className="pr-1">
            <ButtonTwo tag="입장" className="text-xs" navlink="/chat-room" />
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomComponent;
