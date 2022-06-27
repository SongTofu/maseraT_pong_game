import React from "react";

interface BtnOneProps {
  tag: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function ButtonOne({ tag, onClick }: BtnOneProps): JSX.Element {
  return (
    <div className="bg-green-400 p-10">
      <button
        className="bg-button rounded text-white w-[300px] h-[40px] tracking-widest"
        onClick={onClick}
      >
        &nbsp;{tag}
      </button>
    </div>
  );
}

export default ButtonOne;
