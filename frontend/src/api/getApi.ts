import axios from "axios";

export async function getApi(api: string) {
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjU3MDg3OTMwLCJleHAiOjE2ODg2MjM5MzB9.vedsKRI96GBQFNsNW05lalMGB4Va9whCmzxbnd5xzP4`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjU3MjU2MTAzLCJleHAiOjE2ODg3OTIxMDN9.h0Ao071lHRnrLTEbdDMlLQI0XZ3etODmwS-tVXnBWjw`,
    },
  };

  const response = await axios.get("http://112.154.12.4:3000/" + api, config);
  // console.log(response.data.nickname);
  // console.log(response.data.personalWin);
  return response.data;
}
