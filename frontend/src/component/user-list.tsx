import { useState, useEffect } from "react";
import { UserType } from "../type/user-type";
import { State } from "../type/enum/state.enum";
import { getCookie } from "../func/get-cookie";
import { socket } from "../App";

export function UserList() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [friends, setFriends] = useState<UserType[]>([]);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then(json => setUsers(json));

    fetch(process.env.REACT_APP_API_URL + "friend", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then(json => setFriends(json));
  }, []);

  useEffect(() => {
    socket.on("connect-user", () => {});
  }, [users, friends]);

  const onClick = () => {
    setIsFriend(curr => !curr);
  };
  return (
    <div>
      <button onClick={onClick}>{isFriend ? "친구" : "전체유저"}</button>
      <ul>
        {isFriend
          ? friends.map(friend => (
              <li key={friend.userId}>
                {friend.state === State.CONNECT ? "온라인 " : null}
                {friend.state === State.IN_GAME ? "게임중 " : null}
                {friend.state === State.DISCONNECT ? "오프라인 " : null}
                {friend.nickname}
              </li>
            ))
          : users.map(user => (
              <li key={user.userId}>
                {user.state === State.CONNECT ? "온라인 " : null}
                {user.state === State.IN_GAME ? "게임중 " : null}
                {user.nickname}
              </li>
            ))}
      </ul>
    </div>
  );
}
