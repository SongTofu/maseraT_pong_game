import React from "react";

interface BtnProps {
  tag: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  nickDeactivate?: boolean; // nickname's submit button
  myProfile?: boolean; // profile's 4 button
  isFriend?: boolean; // other profile's add friend button
  isBlocked?: boolean; // other profile's add blocklist button
  codeValidate?: boolean; // second-auth button
}

function BtnPopUp({
  tag,
  onClick,
  nickDeactivate,
  myProfile,
  isFriend,
  isBlocked,
  codeValidate,
}: BtnProps): JSX.Element {
  return (
    <>
      {myProfile ? (
        <button
          className={`bg-button rounded text-white font-main w-[200px] h-[40px] tracking-widest ${
            myProfile ? "opacity-25" : ""
          }`}
          onClick={onClick}
          disabled={myProfile ? true : false}
        >
          {tag}
        </button>
      ) : isFriend ? (
        <button
          className={`bg-button rounded text-white font-main w-[200px] h-[40px] tracking-widest ${
            isFriend ? "opacity-25" : ""
          }`}
          onClick={onClick}
          disabled={isFriend ? true : false}
        >
          {tag}
        </button>
      ) : isBlocked ? (
        <button
          className={`bg-button rounded text-white font-main w-[200px] h-[40px] tracking-widest ${
            isBlocked ? "opacity-25" : ""
          }`}
          onClick={onClick}
          disabled={isBlocked ? true : false}
        >
          {tag}
        </button>
      ) : codeValidate ? (
        <button
          className={`bg-button rounded text-white font-main w-[200px] h-[40px] tracking-widest ${
            codeValidate ? "opacity-25" : ""
          }`}
          onClick={onClick}
          disabled={codeValidate ? true : false}
        >
          {tag}
        </button>
      ) : nickDeactivate ? (
        <button
          className={`bg-button rounded text-white font-main w-[200px] h-[40px] tracking-widest ${
            nickDeactivate ? "opacity-25" : ""
          }`}
          onClick={onClick}
          disabled={nickDeactivate ? true : false}
        >
          {tag}
        </button>
      ) : (
        <button
          className={`bg-button rounded text-white font-main w-[200px] h-[40px] tracking-widest`}
          onClick={onClick}
        >
          {tag}
        </button>
      )}
    </>
  );
}

export default BtnPopUp;
