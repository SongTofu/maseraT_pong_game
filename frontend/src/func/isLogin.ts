import { getCookie } from "./get-cookie";

export function isLogin() {
  if (getCookie("token")) return true;
  return false;
}
