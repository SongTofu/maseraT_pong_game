import { selector } from "recoil";
import { getApi } from "../api/getApi";
export interface IChatRoom {
  chatRoomId: number;
  title: string;
  password: string;
  numParticipant: number;
}

export const getChatRoom = selector({
  key: "chat-room/get",
  get: async () => {
    return await getApi("chat/room");
  },
});
