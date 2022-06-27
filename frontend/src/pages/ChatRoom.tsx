import React from "react";
import TopNavBar from "../components/TopNavBar";
import UserListBox from "../components/UserListBox";

function ChatRoom() {
  return (
    <div>
      <TopNavBar>
        <div className="content">
          <UserListBox buttonTag="참여 유저" />
        </div>
      </TopNavBar>
    </div>
  );
}

export default ChatRoom;
