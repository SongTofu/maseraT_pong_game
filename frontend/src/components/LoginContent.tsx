import React from "react";
import Pong from "../img/pong.png";
import ButtonOne from "../components/ButtonOne";

function LoginContent(): JSX.Element {
  return (
    <>
      <div className="bg-red-500 w-7/12 p-10">
        <img alt={"pong"} src={Pong} />
      </div>
      <div className="bg-blue-500 flex flex-col w-5/12 p-10 items-center">
        <div className="bg-green-500 p-10">
          <h1 className="text-3xl font-semibold w-[300px] h-[40px] text-center">
            퐁게임 함 하쉴???
          </h1>
        </div>
        <div className="p-10"></div>
        <ButtonOne />
      </div>
    </>
  );
}

export default LoginContent;
