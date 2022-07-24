import { getToken } from "./get-token";

export async function getApi(uri: string) {
  // const token = getToken();
  const response = await fetch(`http://localhost:3000/${uri}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getToken()
    }
  });
  const json = await response.json();

  return json;
}
