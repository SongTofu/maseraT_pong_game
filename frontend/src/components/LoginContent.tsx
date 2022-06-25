import React from "react";
import Pong from "../img/pong.png";
import ButtonOne from "./ButtonOne";

function LoginContent(): JSX.Element {
  return (
    <>
      <img alt={"pong"} src={Pong} className="w-full h-72 min-w-max" />
      <div className="bg-white w-full h-72 p-1 flex flex-col min-w-max">
        <div className="h-24 min-w-max"></div>
        <h1 className="text-black text-center font-semibold min-w-max">
          퐁 게임 한판 하쉴???
        </h1>
        <div className="h-full bg-white pt-20 min-w-max">
          <ButtonOne />
        </div>
      </div>
    </>
  );
}

export default LoginContent;
