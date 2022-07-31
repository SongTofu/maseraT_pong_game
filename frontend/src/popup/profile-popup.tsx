import { useState, useEffect } from "react";
import { UserInfoType } from "../type/user-info-type";
import { getCookie } from "../func/get-cookie";
import { Record } from "./record";

export function ProfilePopup({ userId }: any) {
  const [info, setInfo] = useState<UserInfoType>();
  const [isFriend, setIsFriend] = useState(false);
  const [isBlock, setIsBlock] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "user/info/" + userId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setInfo(json);
        setIsFriend(json.isFriend);
        setIsBlock(json.isBlocked);
      });
  }, []);

  const onAddFriend = () => {
    setIsFriend(true);
    fetch(process.env.REACT_APP_API_URL + "friend/", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + getCookie("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetId: userId }),
    });
  };

  const onAddBlock = () => {
    setIsBlock(true);
    fetch(process.env.REACT_APP_API_URL + "block/", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + getCookie("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetId: userId }),
    });
  };

  const onDeleteBlock = () => {
    setIsBlock(false);
    fetch(process.env.REACT_APP_API_URL + "block/", {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + getCookie("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetId: userId }),
    });
  };

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        backgroundColor: "Red",
        paddingLeft: "10px",
      }}
    >
      {info ? (
        <div>
          <img src={process.env.REACT_APP_API_URL + info.profileImg} alt="" />
          <p>{info.nickname}</p>
          <p>{info.level}</p>
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
            <button>게임 신청</button>
            <button>DM 보내기</button>
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
