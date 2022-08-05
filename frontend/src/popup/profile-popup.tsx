import { useState, useEffect } from "react";
import { UserInfoType } from "../type/user-info-type";
import { getCookie } from "../func/cookieFunc";
import { Record } from "./record";
import { AchievementType } from "../type/achievement-type";
import { socket } from "../App";
import { NavigateFunction, useNavigate } from "react-router-dom";

type Props = {
  userId: number;
};

export function ProfilePopup({ userId }: Props): JSX.Element {
  const [info, setInfo] = useState<UserInfoType>();
  const [isFriend, setIsFriend] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [achievement, setAchievement] = useState<AchievementType>({
    firstLogin: false,
    firstWin: false,
    firstLose: false,
    thiredWin: false,
    consecThree: false
  });

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "user/info/" + userId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then((user: UserInfoType) => {
        setInfo(user);
        setIsFriend(user.isFriend);
        setIsBlock(user.isBlocked);
      });

    fetch(process.env.REACT_APP_API_URL + "achievement/" + userId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then((achievement: AchievementType) => setAchievement(achievement));

    socket.on("DM", ({ chatRoomId }: { chatRoomId: number }) => {
      navigate("/DM/" + chatRoomId);
    });

    return () => {
      socket.off("DM");
    };
  }, [userId]);

  const onAddFriend = () => {
    setIsFriend(true);
    fetch(process.env.REACT_APP_API_URL + "friend/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ targetId: userId })
    });
  };

  const onAddBlock = () => {
    setIsBlock(true);
    fetch(process.env.REACT_APP_API_URL + "block/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ targetId: userId })
    });
  };

  const onDeleteBlock = () => {
    setIsBlock(false);
    fetch(process.env.REACT_APP_API_URL + "block/", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ targetId: userId })
    });
  };

  const onDMClick = (targetId: number) => {
    socket.emit("DM", { senderId: getCookie("id"), targetId });
  };

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
          <p>level: {Math.floor(info.level)}</p>
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
          <Record userId={userId} />
          <div>
            <button disabled={isFriend} onClick={onAddFriend}>
              친구 추가
            </button>
            <button
              onClick={e => {
                onDMClick(userId);
              }}
            >
              DM 보내기
            </button>
            {isBlock ? (
              <button onClick={onDeleteBlock}>차단 해제</button>
            ) : (
              <button onClick={onAddBlock}>차단 하기</button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
