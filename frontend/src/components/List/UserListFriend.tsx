import React from "react";
import StatusOn from "../../img/circleGreen.svg";
import StatusBusy from "../../img/circleRed.svg";
import StatusOff from "../../img/circleGrey.svg";

interface UListFProps {
  userId: number;
  nickname: string;
  state: number;
}

function UserListFriend({ nickname, state }: UListFProps): JSX.Element {
  return (
    <div className="border-main border-[1px] rounded-sm w-[90%] mt-2 last:mb-2">
      <div className="inline mx-2">
        {state === 0 && (
          <img alt="status-off" src={StatusOff} className="inline" />
        )}
        {state === 1 && (
          <img alt="status-on" src={StatusOn} className="inline" />
        )}
        {state === 2 && (
          <img alt="status-busy" src={StatusBusy} className="inline" />
        )}
      </div>
      <div className="inline font-main text-main-text">{nickname}</div>
    </div>
  );
}

export default UserListFriend;
