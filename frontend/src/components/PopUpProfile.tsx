import React, { useState } from "react";
import DefltImg from "../img/maserat.png";
import Achievement from "./Achievement";
import BtnPopUp from "./BtnPopUp";

function PopUpProfile(): JSX.Element {
  const [display, setDisplay] = useState(false);

  const handleMouseEnter = () => {
    setDisplay(true);
  };

  const handleMouseLeave = () => {
    setDisplay(false);
  };

  return (
    <>
      <div className="child__wrap bg-blue-400 p-2">
        <div className="bg-violet-500 flex items-center">
          <div
            className="img__wrap relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              alt="profileImg"
              src={DefltImg}
              className="rounded-full w-[150px] h-[150px] p-2"
              onClick={() => 1}
            />
            {display && (
              <div
                className="bg-black w-[130px] h-[25px] absolute top-[70px] left-[10px] text-white font-main rounded-full"
                onMouseEnter={handleMouseEnter}
              >
                이미지를 바꿔보세요
              </div>
            )}
          </div>
          <div className="info__wrap bg-green-500 w-[280px] p-4">
            <h1 className="font-main text-2xl">Nickname</h1>
            <h1 className="font-main text-2xl flex justify-between">
              Lv.0
              <Achievement />
            </h1>
          </div>
        </div>
        <div className="line__wrap flex">
          <div className="record__wrap bg-slate-300 w-[400px] flex justify-between  p-2">
            <span className="font-main block">전적/래더전적</span>
            <span className="font-main block">
              {0}승{0}패/{0}승{0}패
            </span>
          </div>
          <div className="btn__wrap w-[50px] flex items-center bg-lime-500">
            <button className="rounded font-main text-white text-sm w-[50px] h-[30px] bg-main">
              전적
            </button>
          </div>
        </div>
      </div>
      <div className="btns__wrap bg-yellow-200">
        <div className="flex justify-between p-2">
          <BtnPopUp tag="친구 추가" />
          <BtnPopUp tag="게임 신청" />
        </div>
        <div className="flex justify-between p-2">
          <BtnPopUp tag="DM 보내기" />
          <BtnPopUp tag="차단 하기" />
        </div>
      </div>
    </>
  );
}

export default PopUpProfile;
