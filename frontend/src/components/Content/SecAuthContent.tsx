import React, { useState } from "react";
import ButtonOne from "../Button/ButtonOne";
import Pong from "../../img/pong.png";
import { getApi } from "../../api/getApi";
import { codeOnChange } from "../../utils/codeOnChange";
import { useSetRecoilState } from "recoil";
import { reqUserInfo } from "../../state/getUserInfo";

function SecAuthContent(): JSX.Element {
  const [code, setCode] = useState("");
  const [displayRed, setDisplayRed] = useState(false);
  const [displayBlack, setDisplayBlack] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const setReqUserInfo = useSetRecoilState(reqUserInfo);

  const resendOnC = async () => {
    return await getApi("second-auth/")
      .then(() => {
        setTimeOut(true);
        setTimeout(() => setTimeOut(false), 30000);
      })
      .catch((err) => console.log(err));
  };

  const submitOnC = async (code: string) => {
    if (code === "") {
      setDisplayRed(false);
      setDisplayBlack(true);
      return;
    }
    return await getApi("second-auth/", undefined, code)
      .then((response) => {
        const { matchCode } = response;
        if (matchCode) {
          setDisplayBlack(false);
          setDisplayRed(false);
          setReqUserInfo((prev) => prev + 1);
          window.location.href = `http://${window.location.host}/game`;
        } else {
          setDisplayBlack(false);
          setDisplayRed(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="img__wrap p-10 w-7/12">
        <img alt={"pong"} src={Pong} />
      </div>
      <div className="input__wrap p-10 w-5/12">
        <div className="text__wrap p-10">
          <h1 className="text-3xl font-main font-semibold w-[300px] h-[40px] text-center">
            2차 인증
          </h1>
        </div>
        <div className="code__wrap flex justify-center p-10">
          <div className="code__input flex flex-col w-2/3">
            <label htmlFor="code" className="font-main p-2">
              코드
            </label>
            <input
              type="text"
              id="code"
              value={code}
              placeholder="코드를 입력해주세요."
              onChange={(event) => codeOnChange(event, setCode)}
              className="font-main rounded border-slate-400 border-[1px] p-2"
            />
            <div className="flex justify-between pt-2">
              {!displayBlack && !displayRed && <div></div>}
              {displayRed && (
                <h1 className="font-main text-red-600 pl-1">
                  코드가 일치하지 않습니다.
                </h1>
              )}
              {displayBlack && (
                <h1 className="font-main text-black pl-1">
                  코드를 입력해주세요.
                </h1>
              )}
              <button
                className={`rounded font-main underline underline-offset-1 ${
                  timeOut ? "opacity-25" : ""
                }`}
                onClick={resendOnC}
                disabled={timeOut ? true : false}
              >
                재전송
              </button>
            </div>
          </div>
        </div>
        <ButtonOne tag="제 출" onClick={() => submitOnC(code)} />
      </div>
    </>
  );
}

export default SecAuthContent;
