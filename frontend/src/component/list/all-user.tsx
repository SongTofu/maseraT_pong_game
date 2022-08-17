import { useState, useEffect } from "react";
import { UserType } from "../../type/user-type";
import { getCookie } from "../../func/cookieFunc";
import { State } from "../../type/enum/state.enum";
import { ProfilePopup } from "../../popup/profile-popup";
import { MyProfilePopup } from "../../popup/my-profile-popup";
import { socket } from "../../App";
import PopupControl from "../../popup/PopupControl";

export function AllUser(): JSX.Element {
  const [users, setUsers] = useState<UserType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectUser, setSelectUser] = useState(0);

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
        currUsers.filter((user: UserType) => user.userId !== userId)
      );
    });

    socket.on("connect-user", (userType: UserType) => {
      setUsers(currUsers => {
        for (let i = 0; i < currUsers.length; i++) {
          if (currUsers[i].userId === userType.userId) return [...currUsers];
        }
        return [...currUsers, userType];
      });
    });

    socket.on("change-state", ({ userId, state, nickname }) => {
      setUsers(currUsers =>
        currUsers.map(user => {
          if (user.userId === userId) {
            user.state = state;
            user.nickname = nickname;
            return user;
          }
          return user;
        })
      );
    });

    return () => {
      socket.off("disconnect-user");
      socket.off("connect-user");
      socket.off("change-state");
    };
  }, [users]);

  return (
    <div className="flex flex-start w-full flex-col">
      {users.map(user => (
        <div key={user.userId}>
          <button
            className="pl-2"
            onClick={() => {
              setOpenModal(true);
              setSelectUser(user.userId);
            }}
          >
            <span className="mr-2">
              {user.state === State.CONNECT ? "온라인" : null}
              {user.state === State.IN_GAME ? "게임중" : null}
            </span>
            <span>{user.nickname}</span>
          </button>
        </div>
      ))}
      {openModal && (
        <PopupControl
          mainText="프로필 보기"
          onClick={() => setOpenModal(false)}
        >
          <div>
            {selectUser === +getCookie("id") ? (
              <MyProfilePopup />
            ) : (
              <ProfilePopup userId={selectUser} />
            )}
          </div>
        </PopupControl>
      )}
    </div>
  );
}
