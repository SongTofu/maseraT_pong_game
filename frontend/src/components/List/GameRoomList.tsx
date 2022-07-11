import React from "react";
import ButtonTwo from "../Button/ButtonTwo";

interface IGameRoomL {
  title: string;
  play: boolean;
}

function GameRoomList({ title, play }: IGameRoomL): JSX.Element {
  return (
    <div className="w-[90%] border-main border-[1px] rounded-sm bg-white flex justify-between items-center mt-2 first:mt-0 last:mb-2">
      <div>
        <p className="px-2 py-1">{title}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="pr-5 text-sm">{1}명</div>
        <div className="pr-5 text-sm">
          {!play && <div className="text-yellow-500 font-main">대기중</div>}
          {play && <div className="text-gray-500 font-main">게임중</div>}
        </div>
        <div className="pr-1">
          {!play && (
            <ButtonTwo tag="입장" className="text-xs" navlink="/game-room" />
          )}
          {play && (
            <ButtonTwo tag="관전" className="text-xs" navlink="/game-room" />
          )}
        </div>
      </div>
    </div>
  );
}

export default GameRoomList;
