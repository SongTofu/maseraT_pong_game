import { getCookie } from "./../cookie/cookie";
import axios from "axios";
// eslint-disable-next-line
export async function patchApi(api: string, data: any) {
  // const accessToken = getCookie("token");
  return await axios({
    // url: `${process.env.REACT_APP_LOCAL_SERVER}${api}`,
    url: `${process.env.REACT_APP_SERVER}${api}`,
    method: "patch",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
      // Authorization: `Bearer ${accessToken}`, // maybe will be modified bearer to jwt
      // "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다. 라고 한다.
    },
    data: data,
  });
}
