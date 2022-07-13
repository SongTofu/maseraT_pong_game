import { selector } from "recoil";
import { getApi } from "../api/getApi";

export interface IRecord {
  enemy: string;
  date: string;
  isLadder: boolean;
  gameWin: boolean;
}

export const getRecordSelector = selector({
  key: "record/get",
  get: async () => {
    return await getApi("record/");
  },
});
