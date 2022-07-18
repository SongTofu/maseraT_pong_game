import React, { useState } from "react";
import BtnChatMenu from "../Button/BtnChatMenu";
import PopUpParent from "./PopUpParent";
import PopUpProfile from "./PopUpProfile";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import PopUpOtherProfile from "./PopUpOtherProfile";
import PopUpCheck from "./PopUpCheck";

interface ChatMenuProps {
  myAuth: number;
  myId: number;
  targetAuth?: number;
  targetId: number;
  isYourself: boolean;
}

function PopUpChatMenu({
  myAuth,
  myId,
  targetAuth,
  targetId,
  isYourself,
}: ChatMenuProps): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [btnTag, setBtnTag] = useState("");

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
    <div className="absolute flex justify-center z-50">
      <div
        className={`w-[140px] ${
          myAuth === 2 ? "h-[200px]" : myAuth === 1 ? "h-[150px]" : "h-[100px]"
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
              onClick={() => {
                setBtnTag("프로필");
                handleOptionChange(openModal);
              }}
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
                onClick={() => {
                  setBtnTag("강퇴하기");
                  handleOptionChange(openModal);
                }}
              />
            </>
          ) : null}
        </div>
      </div>
      {openModal && myId === targetId && btnTag === "프로필" && (
        <ClickAwayListener onClickAway={() => setOpenModal(false)}>
          <div className="fixed top-[100px] left-auto">
            <PopUpParent
              width={"w-[500px]"}
              height={"h-[500px]"}
              mainText={"프로필 보기"}
              onClick={() => handleOptionChange(openModal)}
            >
              <PopUpProfile />
            </PopUpParent>
          </div>
        </ClickAwayListener>
      )}
      {openModal && myId !== targetId && btnTag === "프로필" && (
        <ClickAwayListener onClickAway={() => setOpenModal(false)}>
          <div className="fixed top-[100px] left-auto">
            <PopUpParent
              width={"w-[500px]"}
              height={"h-[500px]"}
              mainText={"프로필 보기"}
              onClick={() => handleOptionChange(openModal)}
            >
              <PopUpOtherProfile targetId={targetId} />
            </PopUpParent>
          </div>
        </ClickAwayListener>
      )}
      {openModal && btnTag === "강퇴하기" && (
        <div className="fixed top-[100px] left-auto">
          <PopUpParent
            width={"w-[300px]"}
            height={"h-[200px]"}
            mainText="강퇴하기"
            onClick={() => handleOptionChange(openModal)}
          >
            <PopUpCheck
              text="정말 강퇴하시겠습니까?"
              onClickConfirm={() => 1}
              onClickCancel={() => handleOptionChange(openModal)}
            />
          </PopUpParent>
        </div>
      )}
    </div>
  );
}

export default PopUpChatMenu;
