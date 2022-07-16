import React, { useState } from "react";
import BtnPopUp from "../Button/BtnPopUp";
import { nicknameOnC } from "../../utils/nicknameOnC";
import { getApi } from "../../api/getApi";
import { patchApi } from "../../api/patchApi";
import { useSetRecoilState } from "recoil";
import { reqUserInfo } from "../../state/getUserInfo";

interface PopNickProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function PopUpNick({ onClick }: PopNickProps): JSX.Element {
  const [nickname, setNickname] = useState("");
  const [displayRed, setDisplayRed] = useState(false);
  const [displayGreen, setDisplayGreen] = useState(false);
  const [displayBlack, setDisplayBlack] = useState(false);
  const [nickLength, setNickLength] = useState(0);
  const setReqUserInfo = useSetRecoilState(reqUserInfo);

  const alreadyExistBtn = (nickname: string) => {
    getApi(`nickname/${nickname}`)
      .then((response) => {
        const { isValidNickname } = response;
        setDisplayBlack(false);
        isValidNickname === true && setNickLength(nickname.length);
        isValidNickname ? setDisplayGreen(true) : setDisplayGreen(false);
        isValidNickname ? setDisplayRed(false) : setDisplayRed(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitNick = async (
    nickname: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (nickname.length) {
      getApi(`nickname/${nickname}`)
        .then((response) => {
          const { isValidNickname } = response;
          if (isValidNickname) {
            if (nickLength !== nickname.length) {
              setDisplayGreen(false);
              setDisplayRed(false);
              setDisplayBlack(true);
              return;
            }
            patchApi("user/info", { nickname })
              .then(() => {
                setDisplayGreen(false);
                setDisplayRed(false);
                onClick(event);
                setReqUserInfo((prev) => prev + 1);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="line__wrap flex justify-between">
        <div className="text__wrap">
          <h1 className="text-xl font-main">새 닉네임</h1>
        </div>
        <div className="wrap flex">
          <form className="input__wrap w-[290px] h-[28px] flex justify-between">
            <input
              type="text"
              value={nickname}
              className="w-[250px] h-full font-main border-black border-b-2 focus:outline-none"
              onChange={(event) => nicknameOnC(event, setNickname)}
            />
          </form>
          <div>
            <button
              className="rounded font-main text-white text-sm w-[60px] h-[28px] bg-button"
              onClick={() => alreadyExistBtn(nickname)}
            >
              중복체크
            </button>
          </div>
        </div>
      </div>
      <div className="btn__wrap flex justify-center">
        <BtnPopUp
          tag="변경하기"
          onClick={(event) => submitNick(nickname, event)}
          nickDeactivate={!displayGreen}
        />
      </div>
      {displayRed && (
        <div className="absolute bottom-[130px] left-[185px] w-[140px] h-[20px] text-red-600 text-center font-main">
          중복된 닉네임입니다!
        </div>
      )}
      {displayGreen && (
        <div className="absolute bottom-[130px] left-[185px] w-[140px] h-[20px] text-green-600 text-center font-main">
          사용 가능합니다!
        </div>
      )}
      {displayBlack && (
        <div className="absolute bottom-[130px] left-[185px] w-[140px] h-[20px] text-black text-center font-main">
          중복체크 눌러주세요!
        </div>
      )}
    </>
  );
}

export default PopUpNick;
