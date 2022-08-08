import React from "react";
import { NavLink } from "react-router-dom";

function Header(): JSX.Element {
  return (
    <div className="bg-main h-24 p-8">
      <NavLink to="/">
        <h1 className="text-4xl text-white text-center tracking-widest font-bold font-main">
          MASERAT PONG
        </h1>
      </NavLink>
    </div>
  );
}

export default Header;
