import React from "react";
import ButtonOne from "../Button/ButtonOne";
import Pong from "../img/pong.png";

function SecAuthContent(): JSX.Element {
  return (
    <>
      <div className="img__wrap bg-red-500 p-10 w-7/12">
        <img alt={"pong"} src={Pong} />
      </div>
      <div className="input__wrap bg-blue-600 p-10 w-5/12">
        <div className="text__wrap bg-green-500 p-10">
          <h1 className="text-3xl font-main font-semibold w-[300px] h-[40px]">
            2차 인증
          </h1>
        </div>
        <div className="code__wrap bg-yellow-600 flex justify-center p-10">
          <div className="code__input flex flex-col w-2/3">
            <label htmlFor="code" className="font-main p-2">
              코드
            </label>
            <input
              type="text"
              id="code"
              placeholder="코드를 입력해주세요."
              className="font-main rounded p-2"
            />
            <div className="flex justify-between bg-slate-600">
              <h1 className="font-main text-red-600">
                코드가 일치하지 않습니다.
              </h1>
              {/* 
              state 하나 넣어서 백엔드에서 일치하지 않다고 정보줄 경우
              삼항연산자로 display 할지 말지 하는 로직 필요 */}
              <button className="rounded text-white font-main underline underline-offset-1">
                재전송
                {/* onClick으로 재전송하는 로직 필요 */}
              </button>
            </div>
          </div>
        </div>
        <ButtonOne tag="제 출" />
      </div>
    </>
  );
}

export default SecAuthContent;
