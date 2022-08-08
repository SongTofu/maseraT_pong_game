import { useState, useEffect } from "react";
import { UserType } from "../../type/user-type";
import { getCookie } from "../../func/get-cookie";
import { State } from "../../type/enum/state.enum";
import { ProfilePopup } from "../../popup/profile-popup";
import { MyProfilePopup } from "../../popup/my-profile-popup";
import PopupControl from "../../popup/PopupControl";
import { open } from "fs";

export function AllUser() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then((res) => res.json())
      .then((json) => setUsers(json));
  }, []);

  return (
    <div className="flex flex-start w-full">
      {users.map((user) => (
        <div>
          <button className="pl-2" onClick={() => setOpenModal(true)}>
            <span className="mr-2">
              {user.state === State.CONNECT ? "온라인" : null}
              {user.state === State.IN_GAME ? "게임중" : null}
            </span>
            <span>{user.nickname}</span>
          </button>
          {openModal && (
            <PopupControl
              mainText="프로필 보기"
              onClick={() => setOpenModal(false)}
            >
              <div>
                {user.userId === +getCookie("id") ? (
                  <MyProfilePopup />
                ) : (
                  <ProfilePopup userId={user.userId} />
                )}
              </div>
            </PopupControl>
          )}
        </div>
      ))}
    </div>
  );
}
