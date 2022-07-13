import { reqUserInfo } from "./getUserInfo";
import { atom, selector } from "recoil";
import { getApi } from "../api/getApi";

export interface IParticipant {
  userId: number;
  nickname: string;
  authority: number;
}

export const getChRoomId = atom({
  key: "chRoomId",
  default: "0",
});

export const getChRoomUser = selector({
  key: "chat/participant/roomId/get",
  get: async ({ get }) => {
    get(reqUserInfo);
    const roomId = get(getChRoomId);
    console.log("room id = ", roomId);
    return await getApi("chat/participant/" + roomId).catch((err) =>
      console.log(err),
    );
  },
});
