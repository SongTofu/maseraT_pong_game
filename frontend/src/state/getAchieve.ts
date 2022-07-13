import { reqUserInfo } from "./getUserInfo";
import { selector } from "recoil";
import { getApi } from "../api/getApi";

export interface IAchieve {
  userId: number;
  firstLogin: boolean;
  firstWin: boolean;
  firstLose: boolean;
  thirdWin: boolean;
  consecThree: boolean;
}

export const getAchieveSel = selector({
  key: "achievement/get",
  get: async ({ get }) => {
    get(reqUserInfo);
    return await getApi("achievement/");
  },
});
