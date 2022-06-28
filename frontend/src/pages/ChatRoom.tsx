import React from "react";
import ChatBox from "../components/ChatBox";
import TopNavBar from "../components/TopNavBar";
import UserListBox from "../components/UserListBox";

function ChatRoom() {
  return (
    <div>
      <TopNavBar>
        <div className="content">
          <ChatBox username="ji-kim" />
          <UserListBox buttonTag="참여 유저" isChatRoom={true} />
        </div>
      </TopNavBar>
    </div>
  );
}

export default ChatRoom;
