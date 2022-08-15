import { socket } from "../App";
import Button from "../component/button/Button";
import { getCookie } from "../func/cookieFunc";
import { ReqGameType } from "../routes/ChatDetail";

type ReqGamePopupType = {
  game: ReqGameType | undefined;
  setIsGame: React.Dispatch<React.SetStateAction<boolean>>;
};

export function RequestGamePopup({
  game,
  setIsGame,
}: ReqGamePopupType): JSX.Element {
  const onOk = (isAccept: boolean) => {
    socket.emit("response-game", {
      userId: getCookie("id"),
      targetId: game?.targetId,
      isSpeedMode: game?.isSpeedMode,
      isAccept,
    });
    setIsGame(false);
  };
  const onNo = (isAccept: boolean) => {
    socket.emit("response-game", {
      userId: getCookie("id"),
      targetId: game?.targetId,
      isSpeedMode: game?.isSpeedMode,
      isAccept,
    });
    setIsGame(false);
  };

  return (
    <div className="flex flex-row justify-evenly ">
      <p>{game?.nickname}</p>
      <p>{game?.isSpeedMode ? "스피드 모드" : "일반 모드"}</p>
      <div className="flex flex-row gap-x-1">
        <Button
          className="btn-sm text-sm"
          tag="수락"
          onClick={() => onOk(true)}
        />
        <Button
          className="btn-sm text-sm"
          tag="거절"
          onClick={() => onNo(false)}
        />
      </div>
    </div>
  );
}
