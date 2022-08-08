import { useState, useEffect } from "react";
import { UserType } from "../../type/user-type";
import { getCookie } from "../../func/get-cookie";
import { State } from "../../type/enum/state.enum";
import { ProfilePopup } from "../../popup/profile-popup";
import PopupControl from "../../popup/PopupControl";

export function Friend() {
  const [friends, setFriends] = useState<UserType[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "friend", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then((res) => res.json())
      .then((json) => setFriends(json));
  }, []);

  return (
    <div className="flex flex-start w-full">
      {friends.map((friend) => (
        <div>
          <button className="pl-2" onClick={() => setOpenModal(true)}>
            <span className="mr-2">
              {friend.state === State.CONNECT ? "온라인" : null}
              {friend.state === State.IN_GAME ? "게임중" : null}
              {friend.state === State.DISCONNECT ? "오프라인" : null}
            </span>
            <span>friend.nickname</span>
          </button>
          {openModal && (
            <PopupControl
              mainText="프로필 보기"
              onClick={() => setOpenModal(false)}
            >
              <ProfilePopup userId={friend.userId} />
            </PopupControl>
          )}
        </div>
      ))}
    </div>
  );
}
