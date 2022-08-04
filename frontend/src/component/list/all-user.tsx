import { useState, useEffect } from "react";
import { UserType } from "../../type/user-type";
import { getCookie } from "../../func/get-cookie";
import { State } from "../../type/enum/state.enum";
import Popup from "reactjs-popup";
import { ProfilePopup } from "../../popup/profile-popup";
import { MyProfilePopup } from "../../popup/my-profile-popup";
import { socket } from "../../App";

export function AllUser(): JSX.Element {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then((res: Response) => res.json())
      .then((json: UserType[]) => {
        setUsers(json);
      });
  }, []);

  useEffect(() => {
    socket.on("disconnect-user", ({ userId }) => {
      setUsers((currUsers: UserType[]) =>
        currUsers.filter((user: UserType) => user.userId != userId)
      );
    });

    socket.on("connect-user", (userType: UserType) => {
      setUsers(curr => [...curr, userType]);
    });

    return () => {
      socket.off("disconnect-user");
      socket.off("connect-user");
    };
  }, [users]);

  return (
    <div>
      {users.map(user => (
        <Popup
          key={user.userId}
          trigger={
            <div>
              <span>
                {user.state === State.CONNECT ? "온라인" : null}
                {user.state === State.IN_GAME ? "게임중" : null}
              </span>
              <span>{user.nickname}</span>
            </div>
          }
        >
          {user.userId === +getCookie("id") ? (
            <MyProfilePopup />
          ) : (
            <ProfilePopup userId={user.userId} />
          )}
        </Popup>
      ))}
    </div>
  );
}
