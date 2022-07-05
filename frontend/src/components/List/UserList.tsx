import React, { useState } from "react";
import StatusOn from "../../img/circleGreen.svg";
import StatusBusy from "../../img/circleRed.svg";
import PopUpChatMenu from "../PopUp/PopUpChatMenu";
import ClickAwayListener from "@mui/material/ClickAwayListener";

interface IProps {
  status: boolean;
  name: string;
  isChatRoom?: boolean;
  myAuth: number;
  targetAuth?: number;
  isYourself: boolean;
}

function UserList({
  status,
  name,
  isChatRoom,
  myAuth,
  targetAuth,
  isYourself,
}: IProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleOptionChange = (val: boolean) => {
    setOpenModal(!val);
  };
  return (
    <div
      className="relative border-main border-[1px] rounded-sm w-[90%] mt-2 last:mb-2"
      onContextMenu={(event) => {
        event.preventDefault();
        handleOptionChange(openModal);
      }}
    >
      <div className="inline mx-2">
        {status && <img alt="status-on" src={StatusOn} className="inline" />}
        {!status && (
          <img alt="status-busy" src={StatusBusy} className="inline" />
        )}
      </div>
      <div className="inline font-main text-main-text">{name}</div>
      {isChatRoom && openModal && (
        <ClickAwayListener onClickAway={() => setOpenModal(false)}>
          <div className="fixed top-[350px] right-[850px] z-50">
            <PopUpChatMenu
              myAuth={myAuth}
              targetAuth={targetAuth}
              isYourself={isYourself}
            />
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default UserList;
