import React, { useState } from "react";
import ButtonTwo from "./ButtonTwo";
import PopUpBlock from "./PopUpBlock";
import PopUpParent from "./PopUpParent";
import UserList from "./UserList";

interface IProps {
  buttonTag?: string;
  isChatRoom?: boolean;
  userStatus?: string;
}

function UserListBox({ buttonTag, isChatRoom, userStatus }: IProps) {
  const [listStatus, setListStatus] = useState("all");
  const [showBlock, setShowBlock] = useState(false);

  const handleShowBlock = (val: boolean) => {
    setShowBlock(!val);
  };
  return (
    <div className="content-box w-[300px] flex flex-col justify-start">
      <div className="w-[80%] flex justify-between mt-4 mx-3">
        <ButtonTwo
          tag={buttonTag ? buttonTag : "전체 유저"}
          className={`text-sm font-main px-5 tracking-widest ${
            listStatus === "all" ? "" : "btn-unselected"
          }`}
          onClick={() => setListStatus("all")}
        />
        <ButtonTwo
          tag="친구"
          className={`text-sm font-main px-9 tracking-widest  ${
            listStatus === "friends" ? "" : "btn-unselected"
          }`}
          onClick={() => setListStatus("friends")}
        />
      </div>
      <div className="border-main border-[1px] w-[80%] h-[55%] rounded-sm m-3 flex flex-col items-center overflow-y-scroll ">
        {listStatus}
        <UserList status={true} name="name" />
        <UserList status={false} name="name" />
        <UserList status={true} name="name" />
        <UserList status={true} name="name" />
        <UserList status={true} name="name" />
        <UserList status={true} name="name" />
        <UserList status={true} name="name" />
        <UserList status={true} name="name" />
        <UserList status={true} name="name" />
      </div>
      <div className="mt-7">
        <ButtonTwo
          tag="차단 유저 목록"
          className="text-sm font-main px-16 tracking-widest btn-unselected"
          onClick={() => handleShowBlock(showBlock)}
        />
      </div>
      {isChatRoom && (
        <div className="flex flex-row mt-4 justify-between w-[80%]">
          {userStatus === "admin" ? (
            <ButtonTwo
              tag="방 설정"
              className="text-sm font-main pr-6 pl-7 tracking-widest"
              onClick={() => {
                console.log("admin");
              }}
            />
          ) : (
            <ButtonTwo
              tag="방 설정"
              className="text-sm font-main pr-6 pl-7 tracking-widest bg-main-light cursor-default"
            />
          )}
          <ButtonTwo
            tag="나가기"
            className="text-sm font-main pr-6 pl-7 tracking-widest"
            navlink="/chat"
          />
        </div>
      )}
      {showBlock && (
        <div className="relative bottom-[350px]">
          <PopUpParent
            width={300}
            height={300}
            mainText="차단 유저"
            onClick={() => handleShowBlock(showBlock)}
          >
            <PopUpBlock />
          </PopUpParent>
        </div>
      )}
    </div>
  );
}

export default UserListBox;
