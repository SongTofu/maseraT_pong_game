import { atom } from "recoil";

export interface IUserInfo {
  ladderWin: number;
  ladderLose: number;
  personalWin: number;
  personalLose: number;
  level: number;
  nickname: string;
  profileImg: string;
  secondAuth: boolean;
}

export const userInfoAtom = atom<IUserInfo[]>({
  key: "userInfo",
  default: [],
});
