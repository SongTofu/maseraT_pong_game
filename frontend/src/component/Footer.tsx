import React from "react";

function Footer(): JSX.Element {
  return (
    <div className="w-full h-24 bg-main p-8">
      <div className="text-md text-white">
        <a
          className="cursor-pointer"
          href="https://github.com/Maserati-Quattroporte/maseraT_pong_game"
          target="_blank"
          rel="noreferrer"
        >
          &copy; MaseraT Pong Github
        </a>
      </div>
    </div>
  );
}

export default Footer;
