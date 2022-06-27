import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ButtonTwo from "./ButtonTwo";
import TestModal from "./TestModal";
import AchievementIcon from "../img/achievementIcon.svg";
import ConsecThree from "../img/consecThree.svg";
import FirstLogin from "../img/firstLogin.svg";
import FirstLose from "../img/firstLose.svg";
import FirstWin from "../img/firstWin.svg";
import ThirdWin from "../img/thirdWin.svg";

interface Props {
  children: JSX.Element | JSX.Element[];
}

function TopBar({ children }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [showAchievement, setShowAchievement] = useState(true);

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
      <ul className="h-15 w-full bg-main flex flex-row items-end">
        <li
          className={`btn-nav border-x-2 ${
            window.location.pathname === "/game" ||
            window.location.pathname === "/game-room"
              ? ""
              : "border-b-2"
          }
        `}
        >
          <h1
            className={`font-nav ${
              window.location.pathname === "/game" ||
              window.location.pathname === "/game-room"
                ? "text-main"
                : "text-gray-300"
            }`}
          >
            <NavLink to="/game">게임</NavLink>
          </h1>
        </li>
        <li
          className={`btn-nav border-r-2 ${
            window.location.pathname === "/chat" ||
            window.location.pathname === "/chat-room"
              ? ""
              : "border-b-2"
          }
        `}
        >
          <h1
            className={`font-nav pl-11 ${
              window.location.pathname === "/chat" ||
              window.location.pathname === "/chat-room"
                ? "text-main"
                : "text-gray-300"
            }`}
          >
            <NavLink to="/chat">채팅</NavLink>
          </h1>
        </li>
        <li>
          <div className="h-12 w-[calc(100vw_-_300px)] bg-main-light flex justify-between px-3 items-center border-b-2 border-main">
            <div className="text-main-text flex flex-row">
              <p className="pr-2">player name</p>
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
              <p className="inline">lv. 0</p>
              <div className="inline">
                <span className="block text-xs">일반/레더전적</span>
                <span className="block text-sm ">0승 0패/0승 0패</span>
              </div>
              <div className="flex">
                <ButtonTwo
                  tag="프로필 보기"
                  className="inline text-sm mr-2"
                  onClick={() => handleOptionChange(openModal)}
                />
                <ButtonTwo
                  tag="닉네임 변경"
                  className="inline text-sm mr-2"
                  onClick={() => {
                    handleOptionChange(openModal);
                  }}
                />
                <ButtonTwo
                  tag="2차 인증 활성화"
                  className="inline text-sm "
                  onClick={() => {
                    handleOptionChange(openModal);
                  }}
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
      {openModal && <TestModal />}

      {children}
    </div>
  );
}

export default TopBar;
