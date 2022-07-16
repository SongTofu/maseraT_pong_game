import { getCookie } from "./../cookie/cookie";
import axios from "axios";
// eslint-disable-next-line
export async function postApi(api: string, data: any) {
  // const accessToken = getCookie("token");
  return await axios({
    // url: `${process.env.REACT_APP_LOCAL_SERVER}${api}`,
    url: `${process.env.REACT_APP_SERVER}${api}`,
    method: "post",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
      // Authorization: `Bearer ${accessToken}`, // maybe will be modified bearer to jwt
    },
    data: data,
  });
}
