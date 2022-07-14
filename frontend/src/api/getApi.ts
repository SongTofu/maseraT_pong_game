import { getCookie } from "./../cookie/cookie";
import axios from "axios";

export async function getApi(api: string, id?: number, code?: string) {
  // const accessToken = getCookie("token");
  // console.log(accessToken);
  const config = {
    headers: {
      // Authorization: `Bearer ${accessToken}`,
      Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
      // Authorization: `Bearer ${process.env.REACT_APP_SEHAN_TOKEN}`,
    },
  };

  // const response = await axios.get(
  //   process.env.REACT_APP_LOCAL_SERVER + api,
  //   config,
  // );
  if (id) {
    const response = await axios.get(
      process.env.REACT_APP_SERVER + api + id,
      config,
    );
    return response.data;
  } else if (code) {
    const response = await axios.get(
      process.env.REACT_APP_SERVER + api + code,
      config,
    );
    return response.data;
  }
  const response = await axios.get(process.env.REACT_APP_SERVER + api, config);
  // console.log(response.data.nickname);
  // console.log(response.data.personalWin);
  return response.data;
}
