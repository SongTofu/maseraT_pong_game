import React from "react";
import PopUpBtnBig from "./PopUpBtnBig";

function PopUpNick(): JSX.Element {
  return (
    <>
      <div className="line__wrap flex justify-between bg-blue-500">
        <div className="text__wrap bg-red-500">
          <h1 className="text-xl font-main">새 닉네임</h1>
        </div>
        <div className="wrap flex">
          <form className="input__wrap w-[290px] h-[28px] bg-slate-400 flex justify-between">
            <input
              type="text"
              className="w-[250px] h-full font-main border-black border-b-2 focus:outline-none"
            />
          </form>
          <div>
            <button className="rounded font-main text-white text-sm w-[60px] h-[28px] bg-button">
              중복체크
            </button>
          </div>
        </div>
      </div>
      <div className="btn__wrap flex justify-center">
        <PopUpBtnBig tag="변경하기" />
      </div>
      <div className="absolute bottom-[130px] left-[185px] w-[140px] h-[20px] text-red-600 text-center font-main">
        중복된 닉네임입니다!
      </div>
    </>
  );
}

export default PopUpNick;
