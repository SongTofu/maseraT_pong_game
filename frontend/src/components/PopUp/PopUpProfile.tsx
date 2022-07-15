import React, { useState } from "react";
import Achievement from "../Achievement";
import BtnPopUp from "../Button/BtnPopUp";
import PopUpParent from "./PopUpParent";
import PopUpRecord from "./PopUpRecord";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  getUserInfoSelector,
  IUserInfo,
  reqUserInfo,
} from "../../state/getUserInfo";
import { imgUploadOnC } from "../../utils/imgUploadOnC";
import { getRecordSelector, IRecord } from "../../state/getRecord";
import { getAchieveSel, IAchieve } from "../../state/getAchieve";

function PopUpProfile(): JSX.Element {
  const [display, setDisplay] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const userInfo = useRecoilValue<IUserInfo>(getUserInfoSelector);
  const setReqUserInfo = useSetRecoilState(reqUserInfo);
  const records = useRecoilValue<IRecord[]>(getRecordSelector);
  const achieve = useRecoilValue<IAchieve>(getAchieveSel);

  const handleMouseEnter = () => setDisplay(true);

  const handleMouseLeave = () => setDisplay(false);

  const handleOptionChange = (val: boolean) => {
    setOpenModal(!val);
  };

  return (
    <div>
      <div className="child__wrap bg-blue-400 p-2">
        <div className="bg-violet-500 flex items-center">
          <div
            className="img__wrap relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {display && (
              <label
                htmlFor="profileImg"
                className="bg-black w-[150px] h-[150px] absolute text-center rounded-full opacity-50"
                onMouseEnter={handleMouseEnter}
              >
                <div className="mt-[70px]">
                  <span className="text-white font-main">
                    눌러서 바꿔보세요
                  </span>
                </div>
              </label>
            )}
            <input
              type="file"
              id="profileImg"
              accept="image/*"
              onChange={(event) => imgUploadOnC(event, setReqUserInfo)}
              className="hidden"
            />
            <div className="img__wrap">
              <img
                alt="profileImg"
                src={`${process.env.REACT_APP_SERVER}${userInfo.profileImg}`}
                className="rounded-full w-[150px] h-[150px] p-2"
              />
            </div>
          </div>
          <div className="info__wrap bg-green-500 w-[280px] p-4">
            <h1 className="font-main text-2xl">{userInfo.nickname}</h1>
            <h1 className="font-main text-2xl flex justify-between">
              Lv.{userInfo.level}
              <Achievement achieve={achieve} />
            </h1>
          </div>
        </div>
        <div className="line__wrap flex">
          <div className="record__wrap bg-slate-300 w-[400px] flex justify-between  p-2">
            <span className="font-main block">전적/래더전적</span>
            <span className="font-main block">
              {userInfo.personalWin}승{userInfo.personalLose}패/
              {userInfo.ladderWin}승{userInfo.ladderLose}패
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
                    <PopUpRecord records={records} />
                  </PopUpParent>
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
      </div>
      <div className="btns__wrap bg-yellow-200">
        <div className="flex justify-between p-2">
          <BtnPopUp tag="친구 추가" myProfile={true} />
          <BtnPopUp tag="게임 신청" myProfile={true} />
        </div>
        <div className="flex justify-between p-2">
          <BtnPopUp tag="DM 보내기" myProfile={true} />
          <BtnPopUp tag="차단 하기" myProfile={true} />
        </div>
      </div>
    </div>
  );
}

export default PopUpProfile;
