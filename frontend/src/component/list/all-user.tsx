import { useState, useEffect } from "react";
import { UserType } from "../../type/user-type";
import { getCookie } from "../../func/get-cookie";
import { State } from "../../type/enum/state.enum";

export function AllUser() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then(json => setUsers(json));
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.userId}>
          <span>
            {user.state === State.CONNECT ? "온라인" : null}
            {user.state === State.IN_GAME ? "게임중" : null}
          </span>
          <span>{user.nickname}</span>
        </div>
      ))}
    </div>
  );
}
