import React, { useState } from "react";
import BtnPopUp from "../Button/BtnPopUp";

function PopUpRoomSet(): JSX.Element {
  const [isSelect, setIsSelect] = useState(false);
  const handleMouseClick = (val: boolean) => {
    setIsSelect(!val);
  };
  return (
    <>
      <div>
        <div className="text__wrap bg-lime-400 mb-2">
          <span className="font-main text-2xl">방 제목</span>
        </div>
        <div className="input__wrap bg-blue-300">
          {/* 방 설정의 경우 value로 이미 설정된 방 이름 갖고 있어야함 */}
          <input
            type="text"
            className="w-[320px] h-[32px] font-main border-black border-b-2 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <div className="text__wrap bg-lime-400 mb-2">
          <span className={`font-main text-2xl ${!isSelect && "opacity-25"}`}>
            비밀번호
          </span>
        </div>
        <div className="input__wrap bg-blue-300">
          <input
            type="password"
            className={`w-[320px] h-[32px] font-main border-black border-b-2 focus:outline-none ${
              !isSelect && "opacity-25"
            }`}
            disabled={!isSelect}
          />
        </div>
        <div className="passwd__wra flex justify-end mr-[25px]">
          <div className="btn__wrap mr-1">
            <button
              className={`w-[14px] h-[14px] border-black border-2 ${
                isSelect ? "bg-red-500" : null
              }`}
              onClick={() => handleMouseClick(isSelect)}
            ></button>
          </div>
          <div className="text__wrap">
            <span className="font-main">비밀번호 설정</span>
          </div>
        </div>
      </div>
      <div className="btn__wrap flex justify-center">
        <BtnPopUp tag="확 인" />
      </div>
    </>
  );
}

export default PopUpRoomSet;
