import { selector } from "recoil";
import { getApi } from "../api/getApi";

export interface IParticipant {
  userId: number;
  nickname: string;
  authority: number;
}

export const getChRoomUser = selector({
  key: "chat/participant/roomId/get",
  get: async () => {
    return await getApi("chat/participant/1");
  },
});
