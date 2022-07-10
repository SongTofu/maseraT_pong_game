import React from "react";
import { useRecoilValue } from "recoil";
import shortid from "shortid";
import { getChatRoom, IChatRoom } from "../../state/getChRoom";
import ButtonTwo from "../Button/ButtonTwo";
import ChatRoomList from "../List/ChatRoomList";
import GameRoomList from "../List/GameRoomList";

interface IProps {
  buttonTag: string;
  isGame: boolean;
}

function MainBox({ buttonTag, isGame }: IProps) {
  const chatRooms = useRecoilValue<IChatRoom[]>(getChatRoom);
  return (
    <div className="content-box w-[550px] mr-3 my-5">
      <div className="w-[90%] flex justify-end pt-4 pb-4">
        <ButtonTwo
          tag={buttonTag}
          className="px-4 tracking-widest text-sm font-main"
        />
      </div>
      <div className="h-full w-full flex flex-col items-center mb-3 overflow-y-scroll">
        {isGame ? (
          <>
            <GameRoomList title="title" play={true} />
            <GameRoomList title="title" play={false} />
            <GameRoomList title="title" play={true} />
            <GameRoomList title="title" play={true} />
            <GameRoomList title="title" play={true} />
            <GameRoomList title="title" play={true} />
            <GameRoomList title="title" play={true} />
            <GameRoomList title="title" play={true} />
          </>
        ) : (
          chatRooms.map((chatRoom) => (
            <ChatRoomList
              key={shortid.generate()}
              title={chatRoom.title}
              passwd={chatRoom.password ? true : false}
              roomId={1}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MainBox;
