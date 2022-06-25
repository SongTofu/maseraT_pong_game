import { UserState } from "../user-state.enum";

export class TargetUserInfoDto {
  nickname: string;
  pWin: number;
  pLose: number;
  rWin: number;
  rLose: number;
  profileImg: string;
  state: UserState;
  level: number;
  isFriend: boolean;
  isBlocked: boolean;
}
