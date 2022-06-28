import React from "react";
import ButtonOne from "../components/ButtonOne";
import DefltImg from "../img/maserat.png";

function LogIn(): JSX.Element {
  return (
    <div className="upload__wrap bg-red-900 p-10 my-20 mx-28 min-w-max">
      <div className="bg-blue-500 flex flex-col items-center">
        <h1 className="text-3xl p-8">Nickname의 프로필</h1>
        <div className="img__wrap bg-yellow-400">
          <img src={DefltImg} alt="default" className="p-8 rounded-full" />
        </div>
        <div className="upload__input bg-green-400 flex flex-col items-center">
          <label
            className="bg-button rounded text-white text-center w-1/3 p-1 "
            htmlFor="profile"
          >
            이미지 업로드
          </label>
          <input
            type="file"
            id="profile"
            accept="image/*"
            className="invisible"
          />
        </div>
        <div className="bg-yellow-700 w-[300px]">
          <div className="nick__input flex flex-col">
            <label htmlFor="nickname" className="p-2">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              placeholder="닉네임을 입력해주세요."
              className="rounded p-2"
            />
          </div>
        </div>
        <ButtonOne tag="제 출" />
      </div>
    </div>
  );
}

export default LogIn;
