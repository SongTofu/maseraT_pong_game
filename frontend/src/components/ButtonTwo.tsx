import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  tag: string;
  className?: string;
  navlink?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function ButtonTwo({ tag, className, onClick, navlink }: IProps) {
  return (
    <div>
      {navlink && (
        <NavLink to={navlink}>
          <button className={`btn-two ${className}`} onClick={onClick}>
            {tag}
          </button>
        </NavLink>
      )}
      {!navlink && (
        <button className={`btn-two ${className}`} onClick={onClick}>
          {tag}
        </button>
      )}
    </div>
  );
}

export default ButtonTwo;
