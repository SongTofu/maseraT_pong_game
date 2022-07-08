import { selector } from "recoil";
import { getApi } from "../api/getApi";

export interface IBlock {
  userId: string;
  nickname: string;
  state: number;
}

export const getBlockSelector = selector({
  key: "block/get",
  get: async () => {
    return await getApi("block/");
  },
});
