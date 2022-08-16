import { socket } from "../App";
import ReactDOM from "react-dom";
import Button from "../component/button/Button";
import { getCookie } from "../func/cookieFunc";
import { ReqGameType } from "../routes/ChatDetail";

type ReqGamePopupType = {
  game: ReqGameType | undefined;
  setIsGame: React.Dispatch<React.SetStateAction<boolean>>;
};

export function RequestGamePopup({
  game,
  setIsGame
}: ReqGamePopupType): JSX.Element {
  const portalDiv = document.getElementById("portal") as HTMLElement;

  const onOk = (isAccept: boolean) => {
    socket.emit("response-game", {
      userId: getCookie("id"),
      targetId: game?.targetId,
      isSpeedMode: game?.isSpeedMode,
      isAccept
    });
    setIsGame(false);
  };
  const onNo = (isAccept: boolean) => {
    socket.emit("response-game", {
      userId: getCookie("id"),
      targetId: game?.targetId,
      isSpeedMode: game?.isSpeedMode,
      isAccept
    });
    setIsGame(false);
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.1)] z-[1000]"></div>
      <div className="fixed top-[50%] left-[55%] translate-x-[-55%] translate-y-[-50%] z-[1000]">
        <div className="flex flex-col items-center p-3 bg-white border-2 border-main rounded-md">
          <div className="my-3 pb-5 text-xl">{game?.nickname}</div>
          <div className="flex flex-row items-center gap-x-2 mx-3">
            <div className="min-w-[100px] text-center">
              {game?.isSpeedMode ? "스피드 모드" : "일반 모드"}
            </div>
            <div className="flex flex-row gap-x-1 min-w-[100px]">
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
        </div>
      </div>
    </>,
    portalDiv
  );
}
