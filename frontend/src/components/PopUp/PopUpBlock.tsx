import React from "react";
import { useRecoilValue } from "recoil";
import { getBlockSelector, IBlock } from "../../state/getBlock";
import BlockList from "../List/BlockList";
import shortid from "shortid";

function PopUpBlock(): JSX.Element {
  const blocks = useRecoilValue<IBlock[]>(getBlockSelector);
  return (
    <div className="block__list bg-blue-500 h-[200px] overflow-auto">
      {blocks.map((block) => (
        <div key={shortid.generate()}>
          <BlockList nickname={block.nickname} />
        </div>
      ))}
    </div>
  );
}

export default PopUpBlock;
