import React from "react";

interface BtnProps {
  tag: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function BtnPopUp({ tag, onClick }: BtnProps): JSX.Element {
  return (
    <>
      <button
        className="bg-button rounded text-white font-main w-[200px] h-[40px] tracking-widest"
        onClick={onClick}
      >
        {tag}
      </button>
    </>
  );
}

export default BtnPopUp;
