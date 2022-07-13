import React from "react";

interface BtnProps {
  tag: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  nickActivate?: boolean;
}

function BtnPopUp({ tag, onClick, nickActivate }: BtnProps): JSX.Element {
  return (
    <>
      {nickActivate !== undefined && (
        <button
          className={`
      bg-button rounded text-white font-main w-[200px] h-[40px] tracking-widest
      ${nickActivate ? "" : "opacity-25"}
      `}
          onClick={onClick}
          disabled={nickActivate ? false : true}
        >
          {tag}
        </button>
      )}
      {nickActivate === undefined && (
        <button
          className={`
      bg-button rounded text-white font-main w-[200px] h-[40px] tracking-widest
      `}
          onClick={onClick}
        >
          {tag}
        </button>
      )}
      {/* <button
        className={`
        bg-button rounded text-white font-main w-[200px] h-[40px] tracking-widest
        ${nickActivate ? "" : "opacity-25"}
        `}
        onClick={onClick}
        disabled={nickActivate ? false : true}
      >
        {tag}
      </button> */}
    </>
  );
}

export default BtnPopUp;
