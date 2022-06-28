import React from "react";

interface BtnOneProps {
  tag: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function ButtonOne({ tag, onClick }: BtnOneProps): JSX.Element {
  return (
    <div className="bg-green-400 flex justify-center p-10">
      <button
        className="bg-button rounded text-white text-lg font-semibold w-1/2 h-[50px] tracking-[2em]"
        onClick={onClick}
      >
        &nbsp;{tag}
      </button>
    </div>
  );
}

export default ButtonOne;
