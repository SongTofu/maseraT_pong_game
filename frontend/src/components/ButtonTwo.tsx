import React from "react";

interface IProps {
  tag: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function ButtonTwo({ tag, className, onClick }: IProps) {
  return (
    <div>
      <button className={className} onClick={onClick}>
        {tag}
      </button>
    </div>
  );
}

export default ButtonTwo;
