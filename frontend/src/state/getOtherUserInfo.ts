import { reqUserInfo } from "./getUserInfo";
import { atom, selector } from "recoil";
import { getApi } from "../api/getApi";

export const userIdInfoAtom = atom({
  key: "userId/info",
  default: "",
});

export const getOtherUserInfoSel = selector({
  key: "user/info/id/get",
  get: async ({ get }) => {
    get(reqUserInfo);
    const userId = get(userIdInfoAtom);
    console.log("other profile user id = ", userId);
    return await getApi(`user/info/${userId}`).catch((err) => console.log(err));
  },
});
