import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ButtonTwo from "./Button/ButtonTwo";
import Achievement from "./Achievement";
import PopUpParent from "./PopUp/PopUpParent";
import PopUpProfile from "./PopUp/PopUpProfile";
import PopUpNick from "./PopUp/PopUpNick";
import PopUpSecAuth from "./PopUp/PopUpSecAuth";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { getUserInfoSelector } from "../state/getUserInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface Props {
  children: JSX.Element | JSX.Element[];
}

function TopBar({ children }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [btnTag, setBtnTag] = useState("");

  const userInfo = useRecoilValue(getUserInfoSelector);
  const reqApi = useSetRecoilState(getUserInfoSelector);

  const handleOptionChange = (val: boolean) => {
    setOpenModal(!val);
  };
  return (
    <div>
      <div className="flex justify-center bg-main relative">
        <div className="max-w-5xl bg-main z-40">
          <ul className="h-15 flex items-end ">
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
                <NavLink to="/game" onClick={reqApi}>
                  게임
                </NavLink>
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
                className={`font-nav  ${
                  window.location.pathname === "/chat" ||
                  window.location.pathname === "/chat-room"
                    ? "text-main"
                    : "text-gray-300"
                }`}
              >
                <NavLink to="/chat" onClick={reqApi}>
                  채팅
                </NavLink>
              </h1>
            </li>
            <li>
              <div className="h-12 w-[800px] bg-main-light flex justify-between px-3 items-center border-b-2 border-main">
                <div className="text-main-text flex flex-row">
                  <p className="pr-2">{userInfo.nickname}</p>
                  <Achievement />
                </div>
                <div className="w-[500px] text-main-text flex justify-between items-center">
                  <p className="inline">lv. {userInfo.level}</p>
                  <div className="inline">
                    <span className="block text-xs font-main">
                      일반/레더전적
                    </span>
                    <span className="block text-sm font-main">
                      {userInfo.personalWin}승 {userInfo.personalLose}패/
                      {userInfo.ladderWin}승{userInfo.ladderLose}패
                    </span>
                  </div>
                  <div className="flex">
                    <ButtonTwo
                      tag="프로필 보기"
                      className="inline text-sm font-main mr-2"
                      onClick={() => {
                        handleOptionChange(openModal);
                        setBtnTag("프로필");
                      }}
                    />
                    <ButtonTwo
                      tag="닉네임 변경"
                      className="inline text-sm font-main mr-2"
                      onClick={() => {
                        handleOptionChange(openModal);
                        setBtnTag("닉네임");
                      }}
                    />
                    <ButtonTwo
                      tag="2차 인증 활성화"
                      className="inline font-main text-sm "
                      onClick={() => {
                        handleOptionChange(openModal);
                        setBtnTag("2차인증");
                      }}
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          {openModal && btnTag === "프로필" && (
            <ClickAwayListener onClickAway={() => setOpenModal(false)}>
              <div className="flex justify-center">
                <PopUpParent
                  width={"w-[500px]"}
                  height={"h-[500px]"}
                  mainText="프로필 보기"
                  onClick={() => handleOptionChange(openModal)}
                >
                  <PopUpProfile />
                </PopUpParent>
              </div>
            </ClickAwayListener>
          )}
          {openModal && btnTag === "닉네임" && (
            <ClickAwayListener onClickAway={() => setOpenModal(false)}>
              <div className="flex justify-center">
                <PopUpParent
                  width={"w-[500px]"}
                  height={"h-[300px]"}
                  mainText="닉네임 변경"
                  onClick={() => handleOptionChange(openModal)}
                >
                  <PopUpNick />
                </PopUpParent>
              </div>
            </ClickAwayListener>
          )}
          {openModal && btnTag === "2차인증" && (
            <ClickAwayListener onClickAway={() => setOpenModal(false)}>
              <div className="flex justify-center">
                <PopUpParent
                  width={"w-[500px]"}
                  height={"h-[300px]"}
                  mainText="2차 인증 활성화"
                  onClick={() => handleOptionChange(openModal)}
                >
                  <PopUpSecAuth />
                </PopUpParent>
              </div>
            </ClickAwayListener>
          )}
        </div>
        <div className="bg-main-light w-[50%] h-12 absolute top-2 right-0 border-b-2 border-main z-10"></div>
      </div>

      {children}
    </div>
  );
}

export default TopBar;
