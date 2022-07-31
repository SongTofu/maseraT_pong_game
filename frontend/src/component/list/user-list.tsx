import React from "react";
import { useState, useEffect } from "react";
import { Select } from "../../type/enum/select.enum";
import { AllUser } from "./all-user";
import { Friend } from "./freind";
import { ChatUser } from "./chat-user";

export function UserList({ isChatRoom }: any) {
  const [select, setSelect] = useState<Select>(Select.FREIND);

  useEffect(() => {
    setSelect((curr) => {
      if (curr === Select.FREIND) {
        if (isChatRoom) {
          return Select.CHAT_USER;
        } else {
          return Select.ALL_USER;
        }
      } else {
        return Select.FREIND;
      }
    });
  }, [isChatRoom]);

  const onClick = () => {
    setSelect((curr) => {
      if (curr === Select.FREIND) {
        if (isChatRoom) {
          return Select.CHAT_USER;
        } else {
          return Select.ALL_USER;
        }
      } else {
        return Select.FREIND;
      }
    });
  };

  return (
    <div style={{ width: "300px", height: "300px", margin: "auto" }}>
      <button style={{ width: "100%" }} onClick={onClick}>
        {select === Select.ALL_USER ? "전체유저" : null}
        {select === Select.FREIND ? "친구" : null}
        {select === Select.CHAT_USER ? "참여자" : null}
      </button>
      {select === Select.ALL_USER ? <AllUser /> : null}
      {select === Select.FREIND ? <Friend /> : null}
      {select === Select.CHAT_USER ? <ChatUser /> : null}
    </div>
  );
}
