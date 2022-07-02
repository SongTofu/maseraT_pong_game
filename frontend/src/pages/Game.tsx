import React, { useState } from "react";
import MainBox from "../components/Content/MainBox";
import TopNavBar from "../components/TopNavBar";
import UserListBox from "../components/Content/UserListBox";

function Game() {
  const [gameType, setGameType] = useState("regular");
  return (
    <div>
      <TopNavBar>
        <div className="content">
          <div className="flex flex-col mt-[250px] h-full translate-x-[2px]">
            <div
              className={`cursor-pointer border-main border-t-2 border-l-2 rounded-l-md  w-9 h-[15%] flex justify-center items-center  ${
                gameType === "regular"
                  ? "bg-white"
                  : "bg-gray-200" && "border-r-2"
              }`}
              onClick={() => {
                setGameType("regular");
              }}
            >
              <h1
                className={`tracking-[.8em] mt-3 ${
                  gameType === "regular" ? "text-main-text" : "text-main-light"
                }`}
                style={{ writingMode: "vertical-rl" }}
              >
                일반
              </h1>
            </div>
            <div
              className={`cursor-pointer border-main border-t-2 border-l-2 border-b-2 rounded-l-md w-9 h-[15%] flex justify-center items-center  ${
                gameType === "ladder"
                  ? "bg-white"
                  : "bg-gray-200" && "border-r-2"
              }`}
              onClick={() => {
                setGameType("ladder");
              }}
            >
              <h1
                className={`tracking-[.8em] mt-3
                 ${gameType === "ladder" ? "text-main-text" : "text-main-light"}
                `}
                style={{ writingMode: "vertical-rl" }}
              >
                레더
              </h1>
            </div>
          </div>
          <MainBox buttonTag="방 만들기" isGame={true} />
          <UserListBox />
        </div>
      </TopNavBar>
    </div>
  );
}

export default Game;
