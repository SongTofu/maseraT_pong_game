import { Authority } from "../enum/authority.enum";

export class SetAuthorityDto {
  chatRoomId: number;
  userId: number;
  authority: Authority;
}
