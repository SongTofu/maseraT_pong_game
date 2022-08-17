import { useState, useEffect } from "react";
import { UserType } from "../../type/user-type";
import { getCookie } from "../../func/cookieFunc";
import { State } from "../../type/enum/state.enum";
import { ProfilePopup } from "../../popup/profile-popup";
import PopupControl from "../../popup/PopupControl";
import { socket } from "../../App";

export function Friend(): JSX.Element {
  const [friends, setFriends] = useState<UserType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectUser, setSelectUser] = useState(0);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "friend", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then((res: Response) => res.json())
      .then((user: UserType[]) => setFriends(user));
  }, []);

  useEffect(() => {
    socket.on("change-state", ({ userId, state, nickname }) => {
      setFriends(currFriends =>
        currFriends.map(friend => {
          if (friend.userId === userId) {
            friend.state = state;
            friend.nickname = nickname;
            return friend;
          }
          return friend;
        })
      );
    });
  }, [friends]);

  return (
    <div className="flex flex-start w-full flex-col">
      {friends.map(friend => (
        <div key={friend.userId}>
          <button
            className="pl-2"
            onClick={() => {
              setOpenModal(true);
              setSelectUser(friend.userId);
            }}
          >
            <span className="mr-2">
              {friend.state === State.CONNECT ? "온라인" : null}
              {friend.state === State.IN_GAME ? "게임중" : null}
              {friend.state === State.DISCONNECT ? "오프라인" : null}
            </span>
            <span>{friend.nickname}</span>
          </button>
        </div>
      ))}
      {openModal && (
        <PopupControl
          mainText="프로필 보기"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <ProfilePopup userId={selectUser} />
        </PopupControl>
      )}
    </div>
  );
}
