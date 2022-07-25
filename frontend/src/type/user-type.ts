import { State } from "./enum/state.enum";

export type UserType = {
  userId: number;
  nickname: string;
  state: State;
};
