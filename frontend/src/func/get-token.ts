import { Cookies } from "react-cookie";

export function getToken(): string {
  const cookeis = new Cookies();

  return cookeis.get("token");
}
