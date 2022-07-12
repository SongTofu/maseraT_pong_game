import React, { useEffect } from "react";
import ChatBox from "../components/Content/ChatBox";
import TopNavBar from "../components/TopNavBar";
import UserListBox from "../components/Content/UserListBox";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  getChRoomId,
  getChRoomUser,
  IParticipant,
} from "../state/getChRoomUser";
import { getUserInfoSelector, IUserInfo } from "../state/getUserInfo";
import { getChatRoom, IChatRoom } from "../state/getChRoom";

function ChatRoom() {
  const path = window.location.pathname.split("/")[2];
  const [chRoomId, setChRoomId] = useRecoilState(getChRoomId);
  useEffect(() => setChRoomId(path), [path, setChRoomId]);
  const mainUser = useRecoilValue<IUserInfo>(getUserInfoSelector);
  const chatParticipants = useRecoilValue<IParticipant[]>(getChRoomUser);
  const myIndex = chatParticipants.findIndex(
    (chatParticipant) => chatParticipant.userId === mainUser.id,
  );
  const mainUserAuth = chatParticipants[myIndex]?.authority;

  const chRooms = useRecoilValue<IChatRoom[]>(getChatRoom);
  const roomIndex = chRooms.findIndex(
    (chRoom) => chRoom.chatRoomId === +chRoomId,
  );
  const title = chRooms[roomIndex]?.title;

  return (
    <div>
      <TopNavBar>
        <div className="content">
          <ChatBox title={title} />
          <UserListBox
            buttonTag="참여 유저"
            isChatRoom={true}
            chatParticipants={chatParticipants}
            mainUserAuth={mainUserAuth}
          />
        </div>
      </TopNavBar>
    </div>
  );
}

export default ChatRoom;
