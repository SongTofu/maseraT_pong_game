import { Cookies } from "react-cookie";

export function getCookie(key: string): string {
  const cookeis = new Cookies();

  return cookeis.get(key);
}
