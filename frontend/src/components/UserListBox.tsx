import React from "react";
import ButtonTwo from "./ButtonTwo";
import UserList from "./UserList";

interface IProps {
  buttonTag?: string;
}

function UserListBox({ buttonTag }: IProps) {
  return (
    <div className="content-box w-[300px] flex flex-col justify-start">
      <div className="w-[80%] flex justify-between mt-4 mx-3">
        <ButtonTwo
          tag={buttonTag ? buttonTag : "전체 유저"}
          className="text-sm px-5 tracking-widest"
        />
        <ButtonTwo
          tag="친구"
          className="text-sm px-9 tracking-widest btn-unselected"
        />
      </div>
      <div className="border-main border-[1px] w-[80%] h-[55%] rounded-sm m-3 flex flex-col items-center overflow-y-scroll ">
        <UserList status={true} />
        <UserList status={false} />
        <UserList status={true} />
        <UserList status={true} />
        <UserList status={true} />
        <UserList status={true} />
        <UserList status={true} />
        <UserList status={true} />
        <UserList status={true} />
      </div>
      <div className="mt-7">
        <ButtonTwo
          tag="차단 유저 목록"
          className="text-sm px-16 tracking-widest btn-unselected"
        />
      </div>
    </div>
  );
}

export default UserListBox;
