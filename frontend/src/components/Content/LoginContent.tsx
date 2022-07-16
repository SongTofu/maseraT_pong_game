import React, { useState } from "react";
import ButtonOne from "../Button/ButtonOne";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  getUserInfoSelector,
  IUserInfo,
  reqUserInfo,
} from "../../state/getUserInfo";
import { imgUploadOnC } from "../../utils/imgUploadOnC";
import { nicknameOnC } from "../../utils/nicknameOnC";
import { btnNickOnC } from "../../utils/btnNickOnC";

function LoginContent(): JSX.Element {
  const userInfo = useRecoilValue<IUserInfo>(getUserInfoSelector);
  const setReqUserInfo = useSetRecoilState(reqUserInfo);
  const [nickname, setNickname] = useState("");
  const [display, setDisplay] = useState(false);

  return (
    <div className="w-[800px]">
      <div className="text__wrap flex justify-center">
        <h1 className="text-3xl font-main p-10">
          {userInfo.nickname}의 프로필
        </h1>
      </div>
      <div className="img__wrap flex justify-center">
        <img
          src={`${process.env.REACT_APP_SERVER}${userInfo.profileImg}`}
          alt="profileImg"
          className="p-8 rounded-full w-[400px] h-[400px]"
        />
      </div>
      <div className="upload__input flex flex-col items-center p-1">
        <label
          className="bg-button rounded text-white font-main text-center w-1/3 p-1 "
          htmlFor="profile"
        >
          이미지 업로드
        </label>
        <input
          type="file"
          id="profile"
          accept="image/*"
          className="hidden"
          onChange={(event) => imgUploadOnC(event, setReqUserInfo)}
        />
      </div>
      <div className="flex justify-center p-10">
        <div className="nick__input flex flex-col w-1/2">
          <label htmlFor="nickname" className="p-2 font-semibold font-main">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요."
            className="rounded p-2 border-slate-400 border-[1px]"
            onChange={(event) => nicknameOnC(event, setNickname)}
          />
          <div className="flex justify-between w-[360px] h-[40px]">
            {display && (
              <h1 className="text-red-600 p-2 font-main">
                중복된 닉네임입니다.
              </h1>
            )}
          </div>
        </div>
      </div>
      <ButtonOne
        tag="제 출"
        onClick={() => btnNickOnC(nickname, setDisplay, setReqUserInfo)}
      />
    </div>
  );
}

export default LoginContent;
