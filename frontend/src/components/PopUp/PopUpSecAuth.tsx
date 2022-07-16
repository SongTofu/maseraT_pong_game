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

interface PopSecAuthProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function PopUpSecAuth({ onClick }: PopSecAuthProps): JSX.Element {
  const userInfo = useRecoilValue<IUserInfo>(getUserInfoSelector);
  const [changeTag, setChangeTag] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [code, setCode] = useState("");
  const [displayRed, setDisplayRed] = useState(false);
  const [displayGreen, setDisplayGreen] = useState(false);
  const [displayBlack, setDisplayBlack] = useState(false);
  const setReqUserInfo = useSetRecoilState(reqUserInfo);

  const btnCodeOnC = async () => {
    return await getApi("second-auth/")
      .then(() => {
        setChangeTag(true);
        setTimeOut(true);
        setTimeout(() => setTimeOut(false), 30000);
      })
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
    if (code === "") {
      setDisplayRed(false);
      setDisplayGreen(false);
      setDisplayBlack(true);
      return;
    }
    return await getApi("second-auth/", undefined, code)
      .then((response) => {
        console.log("success", response);
        const { matchCode } = response;
        if (matchCode) {
          setDisplayBlack(false);
          setDisplayRed(false);
          setDisplayGreen(true);
        } else {
          setDisplayBlack(false);
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
      <div className="line__wrap flex justify-between">
        <div className="text__wrap">
          <h1 className="text-xl font-main">이메일</h1>
        </div>
        <div className="wrap flex">
          <form className="input__wrap w-[290px] h-[28px]">
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
              } ${timeOut ? "opacity-25" : ""}`}
              onClick={btnCodeOnC}
              disabled={timeOut ? true : displayGreen}
            >
              {changeTag ? "재전송" : "코드전송"}
            </button>
          </div>
        </div>
      </div>
      <div className="line__wrap flex justify-between">
        <div className="text__wrap">
          <h1 className="text-xl font-main">인증코드</h1>
        </div>
        <div className="line__wrap flex">
          <form className="input__wrap w-[290px] h-[28px] flex justify-between">
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
              } ${changeTag ? "" : "opacity-25"}`}
              onClick={() => btnCheckValidateOnC(code)}
              disabled={changeTag ? displayGreen : true}
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
          onClick={(event) => {
            btnActivateOnC();
            onClick(event);
          }}
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
      {displayBlack && (
        <div className="absolute bottom-[90px] left-[185px] w-[140px] h-[20px] text-black text-center font-main">
          코드를 입력해주세요!
        </div>
      )}
      {timeOut && (
        <div className="absolute bottom-[155px] left-[140px] w-[210px] h-[20px] text-black text-center font-main text-sm">
          30초 후 다시 요청할 수 있습니다!
        </div>
      )}
    </>
  );
}

export default PopUpSecAuth;
