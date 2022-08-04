import { GameRoomType } from "../../routes/GameMain";
import { socket } from "../../App";
import { getCookie } from "../../func/get-cookie";

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
    <div>
      <span>{title}</span>
      <span>{isLadder ? " 래더" : " 일반"}</span>
      <span>{isStart ? " 게임중" : " 대기중"}</span>
      <button onClick={onClick}>{isStart ? " 관전" : " 입장"} </button>
    </div>
  );
}
