import React, { useState } from "react";
import BtnChatMenu from "../Button/BtnChatMenu";
import PopUpParent from "./PopUpParent";
import PopUpProfile from "./PopUpProfile";
import ClickAwayListener from "@mui/material/ClickAwayListener";

interface ChatMenuProps {
  myAuth: number;
  targetAuth?: number;
  isYourself: boolean;
}

function PopUpChatMenu({
  myAuth,
  targetAuth,
  isYourself,
}: ChatMenuProps): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleOptionChange = (val: boolean) => {
    setOpenModal(!val);
  };

  const handleDisabled = (yourself: boolean, mute?: boolean): boolean => {
    if (yourself || mute) {
      return true;
    }
    return false;
  };

  const handledMute = (val: boolean) => {
    setIsMuted(!val);
    setTimeout(() => setIsMuted(val), 30000);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpenModal(false)}>
      <div className="fixed flex justify-center">
        <div
          className={`w-[140px] ${
            myAuth === 2
              ? "h-[200px]"
              : myAuth === 1
              ? "h-[150px]"
              : "h-[100px]"
          } bg-white rounded-lg p-2 flex flex-col justify-center border-[1px] border-black`}
        >
          <div className="owner__wrap flex flex-col items-center">
            {myAuth === 2 ? (
              <>
                <div className="text__wrap">
                  <h1
                    className={`font-main font-semibold ${
                      isYourself ? "opacity-25" : ""
                    }`}
                  >
                    관리자 권한
                  </h1>
                </div>
                {/* btn onclick 기능 만들기 */}
                <div className="btn__wrap">
                  <BtnChatMenu
                    className="font-main font-semibold mb-1"
                    tag={targetAuth !== 2 && targetAuth ? "해제" : "설정"}
                    disabled={handleDisabled(isYourself)}
                    onClick={() => 1}
                  />
                </div>
              </>
            ) : null}
            <hr className="w-[100px] border-black border-[1px] my-1" />
          </div>
          <div className="admin__wrap flex flex-col items-center">
            <div className="btn__wrap">
              <BtnChatMenu
                className="font-main my-1"
                tag="프로필 보기"
                disabled={false}
                onClick={() => handleOptionChange(openModal)}
              />
            </div>
            <hr className="w-[100px] border-black border-[1px] my-1" />
          </div>
          <div className="btn__wrap flex flex-col items-center">
            {myAuth ? (
              <>
                <BtnChatMenu
                  className="font-main my-1"
                  tag="30초 채팅 금지"
                  disabled={handleDisabled(isYourself, isMuted)}
                  onClick={() => handledMute(isMuted)}
                />
                <BtnChatMenu
                  className="font-main my-1"
                  tag="강퇴하기"
                  disabled={handleDisabled(isYourself)}
                  onClick={() => 1}
                />
              </>
            ) : null}
          </div>
        </div>
        {openModal && (
          <PopUpParent
            width={"w-[500px]"}
            height={"h-[500px]"}
            mainText={"프로필 보기"}
            onClick={() => handleOptionChange(openModal)}
          >
            <PopUpProfile />
          </PopUpParent>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default PopUpChatMenu;
