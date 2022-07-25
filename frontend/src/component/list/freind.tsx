import { useState, useEffect } from "react";
import { UserType } from "../../type/user-type";
import { getCookie } from "../../func/get-cookie";
import { State } from "../../type/enum/state.enum";

export function Friend() {
  const [friends, setFriends] = useState<UserType[]>([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "friend", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then(json => setFriends(json));
  }, []);

  return (
    <div>
      {friends.map(friend => (
        <div key={friend.userId}>
          <span>
            {friend.state === State.CONNECT ? "온라인" : null}
            {friend.state === State.IN_GAME ? "게임중" : null}
            {friend.state === State.DISCONNECT ? "오프라인" : null}
          </span>
          <span>{friend.nickname}</span>
        </div>
      ))}
    </div>
  );
}
