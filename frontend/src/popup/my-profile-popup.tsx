import { Record } from "./record";
import { useState, useEffect } from "react";
import { UserInfoType } from "../type/user-info-type";
import { getCookie } from "../func/get-cookie";
import { Link } from "react-router-dom";
import { AchievementType } from "../type/achievement-type";

export function MyProfilePopup() {
  const [info, setInfo] = useState<UserInfoType>();
  const [achievement, setAchievement] = useState<AchievementType>({
    firstLogin: false,
    firstWin: false,
    firstLose: false,
    thiredWin: false,
    consecThree: false
  });

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "user/info", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then(json => setInfo(json));

    fetch(process.env.REACT_APP_API_URL + "achievement/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then(json => setAchievement(json));
  }, []);

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        backgroundColor: "Red",
        paddingLeft: "10px"
      }}
    >
      {info ? (
        <div>
          <img src={process.env.REACT_APP_API_URL + info.profileImg} alt="" />
          <p>{info.nickname}</p>
          <p>level: {info.level}</p>
          <p>
            {achievement.firstLogin ? "firstLogin, " : null}
            {achievement.firstWin ? "firstWin, " : null}
            {achievement.firstLose ? "firstLose, " : null}
            {achievement.thiredWin ? "thirdWin, " : null}
            {achievement.consecThree ? "consecThree" : null}
          </p>
          <span>전적/래더전적</span>
          <span>
            {info.personalWin}승 {info.personalLose}패 / {info.ladderWin}승{" "}
            {info.ladderLose}패
          </span>
          <Link to="/login">
            <button>프로필 수정</button>
          </Link>

          <Record userId={""} />
        </div>
      ) : null}
    </div>
  );
}
