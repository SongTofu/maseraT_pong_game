import { selector } from "recoil";
import { getApi } from "../api/getApi";
import { userIdInfoAtom } from "./getOtherUserInfo";
import { reqUserInfo } from "./getUserInfo";

export const getOtherRecordSel = selector({
  key: "record/id/get",
  get: async ({ get }) => {
    get(reqUserInfo);
    const userId = get(userIdInfoAtom);
    return await getApi(`record/${userId}`).catch((err) => console.log(err));
  },
});
