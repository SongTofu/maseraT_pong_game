import axios from "axios";

export async function getApi(api: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
      // Authorization: `Bearer ${process.env.REACT_APP_SEHAN_TOKEN}`,
    },
  };

  const response = await axios.get("http://112.154.12.4:3000/" + api, config);
  // console.log(response.data.nickname);
  // console.log(response.data.personalWin);
  return response.data;
}
