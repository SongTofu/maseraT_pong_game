import { GameUserType } from "../routes/GameDetail";

export function GameProfile(user: GameUserType) {
  return (
    <div style={{ backgroundColor: "tomato", width: "300px", height: "600px" }}>
      <img src={process.env.REACT_APP_API_URL + user.profileImg} alt="" />
      <p>nickname: {user.nickname}</p>
      <p>LV.{user.level}</p>
      <p>전적 / 래더전적</p>
      <p>
        {user.personalWin}승 {user.personalLose}패 / {user.ladderWin}승{" "}
        {user.ladderLose}패
      </p>
    </div>
  );
}
