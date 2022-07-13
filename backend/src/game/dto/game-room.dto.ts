export class GameJoinDto {
  gameRoomId: number;
  title: string;
  userId: number;
  nickname: string;
}

export class GameLeaveDto {
  userId: number;
  title: string;
  gameRoomId: number;
}
