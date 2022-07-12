import ClickAwayListener from "@mui/material/ClickAwayListener";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import shortid from "shortid";
import { getChatRoom, IChatRoom } from "../../state/getChRoom";
import ButtonTwo from "../Button/ButtonTwo";
import ChatRoomList from "../List/ChatRoomList";
import GameRoomList from "../List/GameRoomList";
import PopUpParent from "../PopUp/PopUpParent";
import PopUpRoomSet from "../PopUp/PopUpRoomSet";

interface IProps {
  buttonTag: string;
  isGame: boolean;
}

function MainBox({ buttonTag, isGame }: IProps) {
  const chatRooms = useRecoilValue<IChatRoom[]>(getChatRoom);
  const [openModal, setOpenModal] = useState(false);

  const handleOptionChange = () => setOpenModal((prev) => !prev);
  return (
    <div className="content-box w-[550px] mr-3 my-5">
      <div className="w-[90%] flex justify-end pt-4 pb-4">
        <ButtonTwo
          tag={buttonTag}
          className="px-4 tracking-widest text-sm font-main"
          onClick={handleOptionChange}
        />
      </div>
      {openModal && buttonTag === "채팅방 만들기" && (
        <ClickAwayListener onClickAway={() => setOpenModal(false)}>
          {/* onclick으로 전달해주어서 방설정과 방만들기 구분하기??? 일단 드는생각적어봄 */}
          <div>
            <PopUpParent
              width={"w-[400px]"}
              height={"h-[500px]"}
              mainText={"채팅방 만들기"}
              onClick={handleOptionChange}
            >
              <PopUpRoomSet />
            </PopUpParent>
          </div>
        </ClickAwayListener>
      )}
      {openModal && buttonTag === "방 만들기" && (
        <ClickAwayListener onClickAway={() => setOpenModal(false)}>
          {/* onclick으로 전달해주어서 방설정과 방만들기 구분하기??? 일단 드는생각적어봄 */}
          <div>
            <PopUpParent
              width={"w-[400px]"}
              height={"h-[500px]"}
              mainText={"게임방 만들기"}
              onClick={handleOptionChange}
            >
              {/* 얘는 임시로 넣어논 것 게임방만들기 컴포넌트 새로 만들어야할지도? */}
              <PopUpRoomSet />
            </PopUpParent>
          </div>
        </ClickAwayListener>
      )}
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
              roomId={chatRoom.chatRoomId}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MainBox;
