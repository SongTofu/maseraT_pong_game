import { atom, selector } from "recoil";
import { getApi } from "../api/getApi";

export interface IUserInfo {
  id: number;
  ladderWin: number;
  ladderLose: number;
  personalWin: number;
  personalLose: number;
  level: number;
  nickname: string;
  profileImg: string;
  secondAuth: boolean;
}

// export const userInfoAtom = atom<IUserInfo[]>({
//   key: "userInfo",
//   default: [],
// });

export const reqUserInfo = atom({
  key: "reqUserInfo",
  default: 0,
});

export const getUserInfoSelector = selector({
  key: "userInfo/get",
  get: async ({ get }) => {
    get(reqUserInfo);
    return await getApi("user/info");
  },
  set: ({ set }) => {
    set(reqUserInfo, (prev) => prev + 1);
  },
});
