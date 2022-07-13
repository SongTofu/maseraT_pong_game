import { userIdInfoAtom } from "./getOtherUserInfo";
import { reqUserInfo } from "./getUserInfo";
import { selector } from "recoil";
import { getApi } from "../api/getApi";
export const getOtherAchieveSel = selector({
  key: "achievement/id/get",
  get: async ({ get }) => {
    get(reqUserInfo);
    const userId = get(userIdInfoAtom);
    return await getApi(`achievement/${userId}`).catch((err) =>
      console.log(err),
    );
  },
});
