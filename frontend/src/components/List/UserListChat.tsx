import React, { useState } from "react";
import Owner from "../../img/owner.svg";
import Admin from "../../img/admin.svg";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import PopUpChatMenu from "../PopUp/PopUpChatMenu";
import { useRecoilValue } from "recoil";
import { getUserInfoSelector, IUserInfo } from "../../state/getUserInfo";
import { getChRoomUser, IParticipant } from "../../state/getChRoomUser";

interface UListCProps {
  userId: number;
  nickname: string;
  authority: number;
}

function UserListChat({ nickname, authority }: UListCProps): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const mainUser = useRecoilValue<IUserInfo>(getUserInfoSelector);
  const chatParticipants = useRecoilValue<IParticipant[]>(getChRoomUser);
  const myIndex = chatParticipants.findIndex(
    (participant) => participant.nickname === mainUser.nickname,
  );
  const targetIndex = chatParticipants.findIndex(
    (participant) => participant.nickname === nickname,
  );

  const handleOptionChange = () => setOpenModal((prev) => !prev);
  return (
    <div
      className="relative border-main border-[1px] rounded-sm w-[90%] mt-2 last:mb-2"
      onContextMenu={(event) => {
        event.preventDefault();
        handleOptionChange();
      }}
    >
      <div className="inline mx-2">
        {authority === 2 && <img alt="owner" src={Owner} className="inline" />}
        {authority === 1 && <img alt="admin" src={Admin} className="inline" />}
        {authority === 0 && <div className="mx-[10.5px] inline"> </div>}
      </div>
      <div className="inline font-main text-main-text">{nickname}</div>
      {openModal && (
        <ClickAwayListener onClickAway={() => setOpenModal(false)}>
          <div className="relative">
            <PopUpChatMenu
              myAuth={chatParticipants[myIndex].authority}
              targetAuth={chatParticipants[targetIndex].authority}
              isYourself={
                chatParticipants[myIndex].userId ===
                chatParticipants[targetIndex].userId
              }
            />
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default UserListChat;
