import { GameRoomType } from "../../routes/GameMain";
import { socket } from "../../App";
import { getCookie } from "../../func/cookieFunc";
import Button from "../button/Button";

export function GameRoomList({
  id,
  title,
  isLadder,
  isStart
}: GameRoomType): JSX.Element {
  const onClick = () => {
    socket.emit("game-room-join", {
      gameRoomId: id,
      title,
      userId: getCookie("id")
    });
  };
  return (
    <div className="flex border-[1px] p-1 w-[500px] flex-row justify-between items-center border-main rounded-sm mb-2">
      <div className="pl-2">{title}</div>
      <div className="flex justify-between items-center w-[150px]">
        <span
          className={`${
            isLadder ? "text-cyan-800 font-bold" : "text-slate-900 font-light"
          }`}
        >
          {isLadder ? " 래더" : " 일반"}
        </span>
        <span className={`${isStart ? "text-slate-400" : "text-amber-400"}`}>
          {isStart ? " 게임중" : " 대기중"}
        </span>
        <Button tag={isStart ? " 관전" : " 입장"} onClick={onClick} />
      </div>
    </div>
  );
}
