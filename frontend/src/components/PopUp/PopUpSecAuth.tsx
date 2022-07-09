import React from "react";
import BtnPopUp from "../Button/BtnPopUp";
interface PopSecAuthProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function PopUpSecAuth({ onClick }: PopSecAuthProps): JSX.Element {
  return (
    <>
      <div className="line__wrap flex justify-between bg-blue-500">
        <div className="text__wrap bg-red-500">
          <h1 className="text-xl font-main">이메일</h1>
        </div>
        <div className="wrap flex">
          <form className="input__wrap w-[290px] h-[28px] bg-slate-400">
            <input
              type="email"
              className="w-[250px] h-full font-main border-black border-b-2 focus:outline-none"
            />
          </form>
          <div className="btn__wrap">
            <button
              className="rounded font-main text-white text-sm w-[60px] h-[28px] bg-button"
              onClick={onClick}
            >
              코드전송
            </button>
          </div>
        </div>
      </div>
      <div className="line__wrap flex justify-between bg-blue-500">
        <div className="text__wrap bg-red-500">
          <h1 className="text-xl font-main">인증코드</h1>
        </div>
        <div className="line__wrap flex">
          <form className="input__wrap w-[290px] h-[28px] bg-slate-400 flex justify-between">
            <input
              type="text"
              className="w-[250px] h-full font-main border-black border-b-2 focus:outline-none"
            />
          </form>
          <div className="btn__wrap">
            <button className="rounded font-main text-white text-sm w-[60px] h-[28px] bg-button">
              확인
            </button>
          </div>
        </div>
      </div>
      <div className="btn__wrap flex justify-center">
        <BtnPopUp tag="활성화" />
      </div>
      <div className="absolute bottom-[90px] left-[185px] w-[140px] h-[20px] text-red-600 text-center font-main">
        일치하지 않습니다!
      </div>
    </>
  );
}

export default PopUpSecAuth;
