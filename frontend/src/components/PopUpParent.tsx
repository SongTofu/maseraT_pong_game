import React from "react";

interface PopParentProps {
  width: number;
  height: number;
  mainText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: JSX.Element;
}

function PopUpParent({
  width,
  height,
  mainText,
  onClick,
  children,
}: PopParentProps): JSX.Element {
  return (
    <div className="fixed flex justify-center z-99">
      <div
        className={`w-[${width}px] h-[${height}px] rounded-[12px] bg-white border-black border-2 p-[25px]`}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-main text-main font-semibold">
            {mainText}
          </h1>
          <button
            className="text-red-500 font-main font-bold text-2xl"
            onClick={onClick}
          >
            X
          </button>
        </div>
        {/* 이부분이 children으로 들어갈 부분 */}
        <div className="h-full flex flex-col justify-evenly">{children}</div>
      </div>
    </div>
  );
}

export default PopUpParent;
