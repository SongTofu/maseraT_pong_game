import { GameUserType } from "../routes/GameDetail";

export function GameProfile(user: GameUserType): JSX.Element {
  return (
    <div className="w-[300px] h-[600px] flex flex-col justify-center items-center">
      <img
        className="w-[250px] h-[250px] mb-5"
        src={process.env.REACT_APP_API_URL + user.profileImg}
        alt=""
      />
      <p className="text-xl mb-2">nickname: {user.nickname}</p>
      <p className="text-lg mb-5">LV. {user.level}</p>
      <p className="flex flex-col">
        <span className="pb-1">전적 / 래더전적</span>
        <span>
          {user.personalWin}승 {user.personalLose}패 / {user.ladderWin}승{" "}
          {user.ladderLose}패
        </span>
      </p>
    </div>
  );
}
