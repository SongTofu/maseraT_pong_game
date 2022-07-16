import React from "react";

interface BtnChatProps {
  className: string;
  tag: string;
  disabled: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function BtnChatMenu({
  className,
  tag,
  disabled,
  onClick,
}: BtnChatProps): JSX.Element {
  return (
    <>
      <button
        className={className + (disabled ? " opacity-25" : "")}
        onClick={onClick}
        disabled={disabled}
      >
        {tag}
      </button>
    </>
  );
}

export default BtnChatMenu;
