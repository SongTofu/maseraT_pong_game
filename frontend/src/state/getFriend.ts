import { selector } from "recoil";
import { getApi } from "../api/getApi";
export interface IFriend {
  userId: number;
  nickname: string;
  state: number;
}

export const getFriend = selector({
  key: "friend/get",
  get: async () => {
    return await getApi("friend/");
  },
});
