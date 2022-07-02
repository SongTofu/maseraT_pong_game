import React from "react";

interface BlockLiProps {
  nickname?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function BlockList({ nickname, onClick }: BlockLiProps): JSX.Element {
  return (
    <>
      <div className="w-[200px] h-[35px] rounded bg-white border-[1px] border-black flex items-center justify-between p-1 m-1">
        <span className="font-main">{nickname}</span>
        <button
          className="bg-button rounded text-white font-main text-sm w-[50px] h-[28px]"
          onClick={onClick}
        >
          해제
        </button>
      </div>
    </>
  );
}

export default BlockList;
