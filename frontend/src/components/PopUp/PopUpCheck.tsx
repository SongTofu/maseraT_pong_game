import React from "react";
interface PopUpChkProps {
  text: string;
  onClickConfirm: React.MouseEventHandler<HTMLButtonElement>;
  onClickCancel: React.MouseEventHandler<HTMLButtonElement>;
}

function PopUpCheck({
  text,
  onClickConfirm,
  onClickCancel,
}: PopUpChkProps): JSX.Element {
  return (
    <div className="wrap h-[80px] flex flex-col justify-between mb-4">
      <span className="font-main text-lg font-semibold flex justify-center">
        {text}
      </span>
      <div className="btn__wrap flex justify-evenly">
        <button
          className="bg-button font-main text-sm text-white rounded w-[60px] h-[28px]"
          onClick={(event) => {
            onClickConfirm(event);
            onClickCancel(event);
          }}
        >
          확인
        </button>
        <button
          className="bg-button font-main text-sm text-white rounded w-[60px] h-[28px]"
          onClick={onClickCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default PopUpCheck;
