import React from "react";
import Button from "../component/button/Button";

export function Home(): JSX.Element {
  return (
    <div className="flex justify-evenly items-center">
      <div className="w-[550px]">
        <img src={require("../img/pong.png")} alt="maserati pong" />
      </div>
      <div className="flex flex-col justify-evenly w-[300px] h-[300px] ">
        <h1 className="text-2xl">로그인하세요</h1>
        <Button tag={"로그인"} className={"btn-lg"} onClick={() => {}} />
      </div>
    </div>
  );
}
