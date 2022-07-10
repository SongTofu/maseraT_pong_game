import React from "react";
import StatusOn from "../../img/circleGreen.svg";
import StatusBusy from "../../img/circleRed.svg";

interface UListAProps {
  userId: number;
  nickname: string;
  state: number;
}

function UserListAll({ nickname, state }: UListAProps): JSX.Element {
  return state ? (
    <div className="border-main border-[1px] rounded-sm w-[90%] mt-2 last:mb-2">
      <div className="inline mx-2">
        {state === 1 ? (
          <img alt="status-on" src={StatusOn} className="inline" />
        ) : (
          <img alt="status-busy" src={StatusBusy} className="inline" />
        )}
      </div>
      <div className="inline font-main text-main-text">{nickname}</div>
    </div>
  ) : (
    <></>
  );
}

export default UserListAll;
