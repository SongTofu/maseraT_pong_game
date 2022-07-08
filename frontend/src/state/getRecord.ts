import { atom, selector } from "recoil";
import { getApi } from "../api/getApi";

export interface IRecord {
  enemy: string;
  date: string;
  isLadder: boolean;
  gameWin: boolean;
}

export const gameRecordAtom = atom<IRecord[]>({
  key: "gameRecord",
  default: [],
});

export const getRecordSelector = selector({
  key: "record/get",
  get: async () => {
    return await getApi("record/7");
  },
});
