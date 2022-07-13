import React from "react";
import { NavLink } from "react-router-dom";
import ButtonTwo from "../Button/ButtonTwo";

interface IProps {
  title: string;
}

function ChatBox({ title }: IProps) {
  return (
    <div className="content-box w-[550px] mr-3 my-5 relative rounded-none rounded-r-lg rounded-bl-lg">
      <div className="absolute top-[-30px] left-[-2px] border-main border-x-2 border-t-2 bg-white w-[60%] h-[30px] rounded-t-lg px-2 py-1 text-center">
        <div className="absolute left-2 cursor-pointer">
          <NavLink to="/chat">&lt;</NavLink>
        </div>
        <div>
          <span className="font-main text-main-text">{title}</span>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center">
        <div className="w-[90%] h-[80%] border-main border-2 mt-7 p-1 font-main">
          채팅창
        </div>
        <div className="w-[90%] flex justify-between mt-4">
          <input
            type="text"
            className="w-[85%] border-main border-2 rounded px-2 py-1 text-sm font-main"
          />
          <div>
            <ButtonTwo tag="보내기" className="py-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
