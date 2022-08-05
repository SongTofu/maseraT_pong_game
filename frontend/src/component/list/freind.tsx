import { useState, useEffect } from "react";
import { UserType } from "../../type/user-type";
import { getCookie } from "../../func/cookieFunc";
import { State } from "../../type/enum/state.enum";
import Popup from "reactjs-popup";
import { ProfilePopup } from "../../popup/profile-popup";

export function Friend(): JSX.Element {
  const [friends, setFriends] = useState<UserType[]>([]);

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

  return (
    <div>
      {friends.map((friend: UserType) => (
        <Popup
          key={friend.userId}
          trigger={
            <div>
              <span>
                {friend.state === State.CONNECT ? "온라인" : null}
                {friend.state === State.IN_GAME ? "게임중" : null}
                {friend.state === State.DISCONNECT ? "오프라인" : null}
              </span>
              <span>{friend.nickname}</span>
            </div>
          }
        >
          <ProfilePopup userId={friend.userId} />
        </Popup>
      ))}
    </div>
  );
}
