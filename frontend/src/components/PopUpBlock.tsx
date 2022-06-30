import React from "react";
import BlockList from "./BlockList";

function PopUpBlock(): JSX.Element {
  return (
    <div className="block__list bg-blue-500 h-[200px] overflow-auto">
      <BlockList nickname={"nickname"} />
      <BlockList nickname={"nickname"} />
      <BlockList nickname={"nickname"} />
      <BlockList nickname={"nickname"} />
      <BlockList nickname={"nickname"} />
      <BlockList nickname={"nickname"} />
    </div>
  );
}

export default PopUpBlock;
