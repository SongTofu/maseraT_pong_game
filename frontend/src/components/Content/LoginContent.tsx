import React from "react";
import ButtonOne from "../Button/ButtonOne";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  getUserInfoSelector,
  IUserInfo,
  reqUserInfo,
} from "../../state/getUserInfo";
import { imgUploadOnC } from "../../utils/imgUploadOnC";

function LoginContent(): JSX.Element {
  const userInfo = useRecoilValue<IUserInfo>(getUserInfoSelector);
  const setReqUserInfo = useSetRecoilState(reqUserInfo);

  return (
    <div className="bg-blue-500 w-[800px]">
      <div className="text__wrap bg-violet-500 flex justify-center">
        <h1 className="text-3xl font-main p-10">Nickname의 프로필</h1>
      </div>
      <div className="img__wrap bg-yellow-400 flex justify-center">
        <img
          src={`${process.env.REACT_APP_LOCAL_SERVER}${userInfo.profileImg}`}
          alt="profileImg"
          className="p-8 rounded-full w-[400px] h-[400px]"
        />
      </div>
      <div className="upload__input bg-green-400 flex flex-col items-center p-1">
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
      <div className="bg-yellow-700 flex justify-center p-10">
        <div className="nick__input flex flex-col w-1/2">
          <label htmlFor="nickname" className="p-2 font-semibold font-main">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요."
            className="rounded p-2"
          />
          <div className="flex justify-between bg-lime-200">
            <h1 className="text-red-600 p-2 font-main">
              {/* 
              state 하나 넣어서 백엔드에서 중복된다고 정보줄 경우
              삼항연산자로 display 할지 말지 하는 로직 필요 */}
              중복된 닉네임입니다.
            </h1>
          </div>
        </div>
      </div>
      {/* 버튼 누를 시 제출하는 로직 필요 */}
      <ButtonOne tag="제 출" />
    </div>
  );
}

export default LoginContent;
