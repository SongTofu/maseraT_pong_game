import { useEffect, useState } from "react";
import { UserInfoType } from "../type/user-info-type";
import { getCookie } from "../func/get-cookie";

export function DMProfile({ targetId }: any) {
  const [user, setUser] = useState<UserInfoType>();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "user/info/" + targetId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then(json => setUser(json));
  }, []);

  console.log(user);

  return <div></div>;
}
