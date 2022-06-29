import React from "react";
import StatusOn from "../img/circleGreen.svg";
import StatusBusy from "../img/circleRed.svg";

interface IProps {
  status: boolean;
  name: string;
}

function UserList({ status, name }: IProps) {
  return (
    <div className="border-main border-[1px] rounded-sm w-[90%] mt-2 last:mb-2">
      <div className="inline mx-2">
        {status && <img alt="status-on" src={StatusOn} className="inline" />}
        {!status && (
          <img alt="status-busy" src={StatusBusy} className="inline" />
        )}
      </div>
      <div className="inline  font-main text-main-text">{name}</div>
    </div>
  );
}

export default UserList;
