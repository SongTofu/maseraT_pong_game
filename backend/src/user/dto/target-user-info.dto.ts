import { UserState } from "../user-state.enum";

export class TargetUserInfoDto {
  nickname: string;
  personalWin: number;
  personalLose: number;
  ladderWin: number;
  ladderLose: number;
  profileImg: string;
  state: UserState;
  level: number;
  isFriend: boolean;
  isBlocked: boolean;
}
