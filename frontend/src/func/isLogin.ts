import { socket } from "../App";
import { getCookie } from "./cookieFunc";

export function connectUser(): boolean {
  if (getCookie("isLogin")) {
    socket.emit("connect-user", { userId: getCookie("id") });
    return true;
  }
  return false;
}

export function isToken(): boolean {
  if (getCookie("token")) return true;
  return false;
}
