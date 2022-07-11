import React, { useState } from "react";
import ButtonTwo from "../Button/ButtonTwo";
import PopUpBlock from "../PopUp/PopUpBlock";
import PopUpParent from "../PopUp/PopUpParent";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import UserListAll from "../List/UserListAll";
import UserListChat from "../List/UserListChat";
import UserListFriend from "../List/UserListFriend";
import { useRecoilValue } from "recoil";
import { getChRoomUser, IParticipant } from "../../state/getChRoomUser";
import shortid from "shortid";
import { getUser, IUser } from "../../state/getUser";
import { getFriend, IFriend } from "../../state/getFriend";
import { getUserInfoSelector, IUserInfo } from "../../state/getUserInfo";
import PopUpRoomSet from "../PopUp/PopUpRoomSet";

interface IProps {
  buttonTag?: string;
  isChatRoom?: boolean;
}

function UserListBox({ buttonTag, isChatRoom }: IProps) {
  const [listStatus, setListStatus] = useState("all");
  const [showBlock, setShowBlock] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const chatParticipants = useRecoilValue<IParticipant[]>(getChRoomUser);
  const users = useRecoilValue<IUser[]>(getUser);
  const friends = useRecoilValue<IFriend[]>(getFriend);

  // 현재 접속하고있는 채팅방에서 접속한 유저의 auth
  const mainUser = useRecoilValue<IUserInfo>(getUserInfoSelector);
  const myIndex = chatParticipants.findIndex(
    (chatParticipant) => chatParticipant.nickname === mainUser.nickname,
  );
  const mainUserAuth = chatParticipants[myIndex].authority;

  const handleShowBlock = (val: boolean) => {
    setShowBlock(!val);
  };
  const handleOptionChange = () => setOpenModal((prev) => !prev);
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
        {listStatus} {/*buttonTag ? 참여유저 : 전체유저*/}
        {listStatus === "friends" &&
          friends.map((friend) => (
            <UserListFriend
              key={shortid.generate()}
              userId={friend.userId}
              nickname={friend.nickname}
              state={friend.state}
            />
          ))}
        {listStatus === "all" &&
          isChatRoom &&
          chatParticipants.map((participant) => (
            <UserListChat
              key={shortid.generate()}
              userId={participant.userId}
              nickname={participant.nickname}
              authority={participant.authority}
            />
          ))}
        {listStatus === "all" &&
          !isChatRoom &&
          users.map((user) => (
            <UserListAll
              key={shortid.generate()}
              userId={user.userId}
              nickname={user.nickname}
              state={user.state}
            />
          ))}
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
          {mainUserAuth === 2 ? (
            <ButtonTwo
              tag="방 설정"
              className="text-sm font-main pr-6 pl-7 tracking-widest"
              onClick={handleOptionChange}
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
      {openModal && (
        <ClickAwayListener onClickAway={() => setOpenModal(false)}>
          <div className="relative bottom-[350px] right-[-10px]">
            <PopUpParent
              width={"w-[400px]"}
              height={"h-[500px]"}
              mainText="방 설정"
              onClick={handleOptionChange}
            >
              <PopUpRoomSet />
            </PopUpParent>
          </div>
        </ClickAwayListener>
      )}
      {showBlock && (
        <ClickAwayListener onClickAway={() => setShowBlock(false)}>
          <div className="relative bottom-[350px]">
            <PopUpParent
              width={"w-[300px]"}
              height={"h-[300px]"}
              mainText="차단 유저"
              onClick={() => handleShowBlock(showBlock)}
            >
              <PopUpBlock />
            </PopUpParent>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default UserListBox;
