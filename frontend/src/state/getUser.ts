import { selector } from "recoil";
import { getApi } from "../api/getApi";
export interface IUser {
  userId: number;
  nickname: string;
  state: 0;
}

export const getUser = selector({
  key: "user/get",
  get: async () => {
    return await getApi("user/");
  },
});
