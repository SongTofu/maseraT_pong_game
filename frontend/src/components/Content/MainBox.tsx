import React from "react";
import ButtonTwo from "./ButtonTwo";
import RoomList from "./RoomList";

interface IProps {
  buttonTag: string;
  isGame: boolean;
}

function MainBox({ buttonTag, isGame }: IProps) {
  return (
    <div className="content-box w-[550px] mr-3 my-5">
      <div className="w-[90%] flex justify-end pt-4 pb-4">
        <ButtonTwo
          tag={buttonTag}
          className="px-4 tracking-widest text-sm font-main"
        />
      </div>
      <div className="h-full w-full flex flex-col items-center mb-3 overflow-y-scroll">
        <RoomList isGame={isGame} status={true} />
        <RoomList isGame={isGame} status={false} />
        <RoomList isGame={isGame} status={true} />
        <RoomList isGame={isGame} status={true} />
        <RoomList isGame={isGame} status={true} />
        <RoomList isGame={isGame} status={true} />
        <RoomList isGame={isGame} status={true} />
        <RoomList isGame={isGame} status={true} />
        <RoomList isGame={isGame} status={true} />
        <RoomList isGame={isGame} status={true} />
        <RoomList isGame={isGame} status={true} />
      </div>
    </div>
  );
}

export default MainBox;
