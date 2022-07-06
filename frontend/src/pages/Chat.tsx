import React, { useCallback, useEffect, useState } from "react";
import MainBox from "../components/Content/MainBox";
import TopNavBar from "../components/TopNavBar";
import UserListBox from "../components/Content/UserListBox";
import { useRecoilState } from "recoil";
import { IUserInfo, userInfoAtom } from "../atom/userInfoAtom";
import { getApi } from "../api/getApi";

function Chat() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState<IUserInfo[]>(userInfoAtom);

  const getUser = useCallback(async () => {
    const data = await getApi("user/info");
    setUserInfo((oldUserInfo) => [
      ...oldUserInfo.filter((info) => info.nickname !== data.nickname),
      {
        ladderWin: data.ladderWin,
        ladderLose: data.ladderLose,
        personalWin: data.personalWin,
        personalLose: data.personalLose,
        level: data.level,
        nickname: data.nickname,
        profileImg: data.profileImg,
        secondAuth: data.secondAuth,
      },
    ]);
    setLoading(true);
  }, [setUserInfo]);

  useEffect(() => {
    getUser();
  }, [getUser]);
  console.log(userInfo);
  return loading ? (
    <div>
      <TopNavBar>
        <div className="content">
          <MainBox buttonTag="채팅방 만들기" isGame={false} />
          <UserListBox />
        </div>
      </TopNavBar>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Chat;
