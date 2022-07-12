export class GameJoinDto {
  gameRoodId: number;
  title: string;
  userId: number;
  userNickname: string;
}

export class GameLeaveDto {
  userId: number;
  title: string;
  gameRoomId: number;
}
