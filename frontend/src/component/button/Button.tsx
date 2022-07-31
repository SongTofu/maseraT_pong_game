import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  tag: string;
  className?: string;
  navlink?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

function Button({
  tag,
  className = "btn-sm",
  onClick,
  navlink,
  disabled,
}: IProps) {
  return (
    <div>
      {navlink && (
        <NavLink to={navlink}>
          <button
            className={`${className}`}
            onClick={onClick}
            disabled={disabled}
          >
            {tag}
          </button>
        </NavLink>
      )}
      {!navlink && (
        <button
          className={`${className}`}
          onClick={onClick}
          disabled={disabled}
        >
          {tag}
        </button>
      )}
    </div>
  );
}

export default Button;
