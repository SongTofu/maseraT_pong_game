import { reqUserInfo } from "./getUserInfo";
import { selector } from "recoil";
import { getApi } from "../api/getApi";
export interface IUser {
  userId: number;
  nickname: string;
  state: number;
}

export const getUser = selector({
  key: "user/get",
  get: async ({ get }) => {
    get(reqUserInfo);
    return await getApi("user/");
  },
});
