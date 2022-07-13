import React from "react";
import { useSetRecoilState } from "recoil";
import { reqUserInfo } from "../../state/getUserInfo";
import { btnUnblockOnC } from "../../utils/btnUnblockOnC";

interface BlockLiProps {
  nickname?: string;
  targetId: number;
}

function BlockList({ nickname, targetId }: BlockLiProps): JSX.Element {
  const setReqUserInfo = useSetRecoilState(reqUserInfo);
  return (
    <>
      <div className="w-[200px] h-[35px] rounded bg-white border-[1px] border-black flex items-center justify-between p-1 m-1">
        <span className="font-main">{nickname}</span>
        <button
          className="bg-button rounded text-white font-main text-sm w-[50px] h-[28px]"
          onClick={() => btnUnblockOnC(targetId, setReqUserInfo)}
        >
          해제
        </button>
      </div>
    </>
  );
}

export default BlockList;
