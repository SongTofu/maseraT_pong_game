import { reqUserInfo } from "./getUserInfo";
import { selector } from "recoil";
import { getApi } from "../api/getApi";

export interface IBlock {
  userId: number;
  nickname: string;
  state: number;
}

export const getBlockSelector = selector({
  key: "block/get",
  get: async ({ get }) => {
    get(reqUserInfo);
    return await getApi("block/");
  },
});
