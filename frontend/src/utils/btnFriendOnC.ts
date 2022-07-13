import { SetterOrUpdater } from "recoil";
import { postApi } from "../api/postApi";

export const btnFriendOnC = async (
  targetId: number,
  setReqUserInfo: SetterOrUpdater<number>,
) => {
  postApi("friend", { targetId })
    .then((response) => {
      setReqUserInfo((prev) => prev + 1);
      console.log("response = ", response);
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
};
