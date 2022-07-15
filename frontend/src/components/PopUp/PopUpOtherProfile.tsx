import React, { useEffect, useState } from "react";
import Achievement from "../Achievement";
import BtnPopUp from "../Button/BtnPopUp";
import PopUpParent from "./PopUpParent";
import PopUpRecord from "./PopUpRecord";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IUserInfo, reqUserInfo } from "../../state/getUserInfo";
import {
  getOtherUserInfoSel,
  userIdInfoAtom,
} from "../../state/getOtherUserInfo";
import { IRecord } from "../../state/getRecord";
import { getOtherRecordSel } from "../../state/getOtherRecord";
import { getFriend, IFriend } from "../../state/getFriend";
import { getBlockSelector, IBlock } from "../../state/getBlock";
import { btnFriendOnC } from "../../utils/btnFriendOnC";
import { btnBlockOnC } from "../../utils/btnBlockOnC";
import { IAchieve } from "../../state/getAchieve";
import { getOtherAchieveSel } from "../../state/getOtherAchieve";

interface PopUpOthProfProps {
  targetId: number;
}

function PopUpOtherProfile({ targetId }: PopUpOthProfProps): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const setUserIdInfo = useSetRecoilState(userIdInfoAtom);
  const setReqUserInfo = useSetRecoilState(reqUserInfo);

  useEffect(
    () => setUserIdInfo(targetId.toString()),
    [targetId, setUserIdInfo],
  );

  const targetInfo = useRecoilValue<IUserInfo>(getOtherUserInfoSel);
  const targetRecords = useRecoilValue<IRecord[]>(getOtherRecordSel);

  const myFriends = useRecoilValue<IFriend[]>(getFriend);
  const isFriend = myFriends.findIndex(
    (myFriend) => myFriend.userId === targetId,
  );
  console.log("my friends  = ", isFriend);

  const myBlocks = useRecoilValue<IBlock[]>(getBlockSelector);
  const isBlocked = myBlocks.findIndex(
    (myBlock) => myBlock.userId === targetId,
  );

  console.log("my block = ", isBlocked);

  const targetAchieve = useRecoilValue<IAchieve>(getOtherAchieveSel);

  const handleOptionChange = (val: boolean) => {
    setOpenModal(!val);
  };

  return (
    <div>
      <div className="child__wrap bg-blue-400 p-2">
        <div className="bg-violet-500 flex items-center">
          <div className="img__wrap relative">
            <div className="img__wrap">
              <img
                alt="profileImg"
                src={`${process.env.REACT_APP_SERVER}${targetInfo?.profileImg}`}
                className="rounded-full w-[150px] h-[150px] p-2"
              />
            </div>
          </div>
          <div className="info__wrap bg-green-500 w-[280px] p-4">
            <h1 className="font-main text-2xl">{targetInfo?.nickname}</h1>
            <h1 className="font-main text-2xl flex justify-between">
              Lv.{targetInfo?.level}
              <Achievement achieve={targetAchieve} />
            </h1>
          </div>
        </div>
        <div className="line__wrap flex">
          <div className="record__wrap bg-slate-300 w-[400px] flex justify-between  p-2">
            <span className="font-main block">전적/래더전적</span>
            <span className="font-main block">
              {targetInfo?.personalWin}승{targetInfo?.personalLose}패/
              {targetInfo?.ladderWin}승{targetInfo?.ladderLose}패
            </span>
          </div>
          <div className="btn__wrap w-[50px] flex items-center bg-lime-500">
            <button
              className="rounded font-main text-white text-sm w-[50px] h-[30px] bg-button"
              onClick={() => handleOptionChange(openModal)}
            >
              전적
            </button>
            {openModal && (
              <ClickAwayListener onClickAway={() => setOpenModal(false)}>
                <div className="relative bottom-[200px] left-[-500px]">
                  <PopUpParent
                    width="w-[600px]"
                    height="h-[400px]"
                    mainText="게임 전적"
                    onClick={() => handleOptionChange(openModal)}
                  >
                    <PopUpRecord records={targetRecords} />
                  </PopUpParent>
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
      </div>
      <div className="btns__wrap bg-yellow-200">
        <div className="flex justify-between p-2">
          <BtnPopUp
            tag="친구 추가"
            isFriend={isFriend >= 0}
            onClick={() => btnFriendOnC(targetId, setReqUserInfo)}
          />
          <BtnPopUp tag="게임 신청" />
        </div>
        <div className="flex justify-between p-2">
          <BtnPopUp tag="DM 보내기" />
          <BtnPopUp
            tag="차단 하기"
            isBlocked={isBlocked >= 0}
            onClick={() => btnBlockOnC(targetId, setReqUserInfo)}
          />
        </div>
      </div>
    </div>
  );
}

export default PopUpOtherProfile;
