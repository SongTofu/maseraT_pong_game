import React from "react";
import MainBox from "../components/Content/MainBox";
import TopNavBar from "../components/TopNavBar";
import UserListBox from "../components/Content/UserListBox";

function Chat() {
  return (
    <div>
      <TopNavBar>
        <div className="content">
          <MainBox buttonTag="채팅방 만들기" isGame={false} />
          <UserListBox />
        </div>
      </TopNavBar>
    </div>
  );
}

export default Chat;
