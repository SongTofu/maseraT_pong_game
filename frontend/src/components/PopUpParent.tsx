import React from "react";

interface PopParentProps {
  mainText?: string;
  children?: JSX.Element;
}

function PopUpParent({ mainText, children }: PopParentProps): JSX.Element {
  return (
    <div className="fixed flex justify-center z-99">
      <div className="w-[500px] h-[500px] rounded-[12px] bg-white border-black border-2  p-[25px]">
        <div className="flex justify-between">
          <h1 className="text-2xl font-main text-main font-semibold">
            {mainText}
          </h1>
          <button>X</button>
        </div>
        {/* 이부분이 children으로 들어갈 부분 */}
        <div className="h-full flex flex-col justify-evenly">{children}</div>
      </div>
    </div>
  );
}

export default PopUpParent;
