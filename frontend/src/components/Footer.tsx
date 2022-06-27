import React from "react";

function Footer(): JSX.Element {
  return (
    <footer className="h-24 bg-main p-8">
      <address className="text-2xl text-white text-center font-semibold not-italic">
        <a
          className="hover:underline underline-offset-4"
          href="https://github.com/Maserati-Quattroporte/maseraT_pong_game"
          target="_blank"
          rel="noreferrer"
        >
          &copy; MaseraT Pong Github
        </a>
      </address>
    </footer>
  );
}

export default Footer;
