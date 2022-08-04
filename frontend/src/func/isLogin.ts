import { socket } from "../App";
import { getCookie } from "./get-cookie";

export function isLogin(): boolean {
  if (getCookie("token")) {
    socket.emit("connect-user", { userId: getCookie("id") });
    return true;
  }
  return false;
}
