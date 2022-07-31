import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "./button/Button";
// import TestModal from "./TestModal";
import AchievementIcon from "../img/achievementIcon.svg";
import ConsecThree from "../img/consecThree.svg";
import FirstLogin from "../img/firstLogin.svg";
import FirstLose from "../img/firstLose.svg";
import FirstWin from "../img/firstWin.svg";
import ThirdWin from "../img/thirdWin.svg";
import PopupControl from "../popup/PopupControl";
import { MyProfilePopup } from "../popup/my-profile-popup";
import { SecondAuthPopup } from "../popup/second-auth-popup";
import { getCookie } from "../func/get-cookie";
import { UserInfoType } from "../type/user-info-type";

interface IProp {
  children?: JSX.Element;
}

function TopBar({ children }: IProp) {
  const [openModal, setOpenModal] = useState(false);
  const [showAchievement, setShowAchievement] = useState(true);
  const [info, setInfo] = useState<UserInfoType>({
    nickname: "",
    personalWin: 0,
    personalLose: 0,
    ladderWin: 0,
    ladderLose: 0,
    profileImg: "",
    level: 0,
    isFriend: false,
    isBlocked: false
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
  }, []);

  const handleOptionChange = (val: boolean) => {
    setOpenModal(!val);
  };

  const handleMouseEnter = () => {
    setShowAchievement(true);
  };

  const handleMouseLeave = () => {
    setShowAchievement(false);
  };

  return (
    <div>
      <div className="flex justify-center bg-main relative">
        <div className="max-w-5xl bg-main z-40">
          <ul className="h-15 flex items-end ">
            <li
              className={`btn-nav border-x-2 ${
                window.location.pathname.includes("/game") ? "" : "border-b-2"
              }
        `}
            >
              <h1
                className={`font-nav ${
                  window.location.pathname.includes("/game")
                    ? "text-main"
                    : "text-gray-300"
                }`}
              >
                <NavLink to="/game">게임</NavLink>
              </h1>
            </li>
            <li
              className={`btn-nav border-r-2 ${
                window.location.pathname.includes("/chat") ? "" : "border-b-2"
              }
        `}
            >
              <h1
                className={`font-nav  ${
                  window.location.pathname.includes("/chat")
                    ? "text-main"
                    : "text-gray-300"
                }`}
              >
                <NavLink to="/chat">채팅</NavLink>
              </h1>
            </li>
            <li>
              <div className="h-12 w-[800px] bg-main-light flex justify-between px-3 items-center border-b-2 border-main">
                <div className="text-main-text flex flex-row">
                  <p className="pr-2">{info.nickname}</p>
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                  >
                    <img
                      alt="achievement icon"
                      src={AchievementIcon}
                      className="w-5"
                    />
                    {showAchievement && (
                      <div
                        className="w-[150px] h-[30px] bg-white border-black rounded-md border-[1px] absolute top-[-20px] left-[10px] flex justify-evenly items-center"
                        onMouseEnter={handleMouseEnter}
                      >
                        <img
                          alt="첫 로그인"
                          title="첫 로그인"
                          src={FirstLogin}
                          className="w-[20px] h-[20px]"
                        />
                        <img
                          alt="첫승"
                          title="첫승"
                          src={FirstWin}
                          className="w-[20px] h-[20px]"
                        />
                        <img
                          alt="3승"
                          title="3승"
                          src={ThirdWin}
                          className="w-[20px] h-[20px]"
                        />
                        <img
                          alt="첫패"
                          title="첫패"
                          src={FirstLose}
                          className="w-[20px] h-[20px]"
                        />
                        <img
                          alt="3연승"
                          title="3연승"
                          src={ConsecThree}
                          className="w-[20px] h-[20px]"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-[500px] text-main-text flex justify-between items-center">
                  <p className="inline">lv. {Math.floor(info.level)}</p>
                  <div className="inline">
                    <span className="block text-xs">일반/레더전적</span>
                    <span className="block text-sm ">
                      {info.personalWin}승 {info.personalLose}패/
                      {info.ladderWin}승 {info.ladderLose}패
                    </span>
                  </div>
                  <div className="flex">
                    <Button
                      tag="프로필 보기"
                      className="btn-sm text-sm mr-2"
                      navlink={"/login"}
                      // onClick={() => handleOptionChange(openModal)}
                    />
                    {/* <PopupControl mainText="프로필 보기">
                      <MyProfilePopup />
                    </PopupControl> */}
                    <Button
                      tag="닉네임 변경"
                      className="btn-sm text-sm mr-2"
                      onClick={() => {
                        handleOptionChange(openModal);
                      }}
                    />
                    {/* <PopupControl mainText="닉네임 변경">
                      <div>"닉네임 변경"</div>
                    </PopupControl> */}
                    <Button
                      tag="2차 인증 활성화"
                      className="btn-sm text-sm "
                      onClick={() => {
                        handleOptionChange(openModal);
                      }}
                    />
                    {/* <PopupControl mainText="2차 인증 활성화">
                      <SecondAuthPopup
                        onSecondAuth={() => {}}
                        isSecondAuth={() => {}}
                        setIsSecondAuth={() => {}}
                      />
                    </PopupControl> */}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="bg-main-light w-[50%] h-12 absolute top-2 right-0 border-b-2 border-main z-10"></div>
      </div>
      {children}
    </div>
  );
}

export default TopBar;
