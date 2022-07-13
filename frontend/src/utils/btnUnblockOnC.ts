import { SetterOrUpdater } from "recoil";
import { deleteApi } from "../api/deleteApi";

export const btnUnblockOnC = async (
  targetId: number,
  setReqUserInfo: SetterOrUpdater<number>,
) => {
  deleteApi("block", { targetId })
    .then((response) => {
      setReqUserInfo((prev) => prev + 1);
      console.log("response = ", response);
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
};
