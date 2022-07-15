import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getApi } from "../../api/getApi";
import { patchApi } from "../../api/patchApi";
import {
  getUserInfoSelector,
  IUserInfo,
  reqUserInfo,
} from "../../state/getUserInfo";
import BtnPopUp from "../Button/BtnPopUp";

function PopUpSecAuth(): JSX.Element {
  const userInfo = useRecoilValue<IUserInfo>(getUserInfoSelector);
  const [changeTag, setChangeTag] = useState(false);
  const [code, setCode] = useState("");
  const [displayRed, setDisplayRed] = useState(false);
  const [displayGreen, setDisplayGreen] = useState(false);
  const setReqUserInfo = useSetRecoilState(reqUserInfo);

  const btnCodeOnC = async () => {
    return await getApi("second-auth/")
      .then(() => setChangeTag(true))
      .catch((err) => console.log(err));
  };

  const codeOnChange = (
    event: React.ChangeEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    const { target } = event;
    if (target.value.length) {
      setCode(target.value);
    } else {
      setCode("");
    }
  };

  const btnCheckValidateOnC = async (code: string) => {
    return await getApi("second-auth/", undefined, code)
      .then((response) => {
        console.log("success", response);
        const { matchCode } = response;
        if (matchCode) {
          setDisplayRed(false);
          setDisplayGreen(true);
        } else {
          setDisplayGreen(false);
          setDisplayRed(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const btnActivateOnC = async () => {
    const secondAuth = true;
    return await patchApi("user/info", { secondAuth })
      .then(() => {
        setReqUserInfo((prev) => prev + 1);
        setDisplayGreen(false);
      })
      .catch((err) => console.log(err));
  };

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
              value={userInfo.email}
              readOnly
              className="w-[250px] h-full font-main border-black border-b-2 focus:outline-none"
            />
          </form>
          <div className="btn__wrap">
            <button
              className={`rounded font-main text-white text-sm w-[60px] h-[28px] bg-button ${
                displayGreen ? "opacity-25" : ""
              }`}
              onClick={btnCodeOnC}
              disabled={displayGreen}
            >
              {changeTag ? "재전송" : "코드전송"}
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
              value={code}
              className="w-[250px] h-full font-main border-black border-b-2 focus:outline-none"
              onChange={(event) => codeOnChange(event)}
            />
          </form>
          <div className="btn__wrap">
            <button
              className={`rounded font-main text-white text-sm w-[60px] h-[28px] bg-button ${
                displayGreen ? "opacity-25" : ""
              }`}
              onClick={() => btnCheckValidateOnC(code)}
              disabled={displayGreen}
            >
              확인
            </button>
          </div>
        </div>
      </div>
      <div className="btn__wrap flex justify-center">
        <BtnPopUp
          tag="활성화"
          codeValidate={!displayGreen}
          onClick={btnActivateOnC}
        />
      </div>
      {displayRed && (
        <div className="absolute bottom-[90px] left-[185px] w-[140px] h-[20px] text-red-600 text-center font-main">
          일치하지 않습니다!
        </div>
      )}
      {displayGreen && (
        <div className="absolute bottom-[90px] left-[185px] w-[140px] h-[20px] text-green-600 text-center font-main">
          코드가 일치합니다!
        </div>
      )}
    </>
  );
}

export default PopUpSecAuth;
