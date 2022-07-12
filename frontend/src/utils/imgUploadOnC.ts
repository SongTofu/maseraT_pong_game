import { SetterOrUpdater } from "recoil";
import axios from "axios";
import { getCookie } from "./../cookie/cookie";

export const imgUploadOnC = async (
  event: React.ChangeEvent<HTMLInputElement> & { target: HTMLInputElement },
  setReqUserInfo: SetterOrUpdater<number>,
) => {
  const { target } = event;
  const formData = new FormData();
  const accessToken = getCookie("token");
  if (target.files?.length) {
    formData.append("profile", target.files[0]);
    await axios({
      url: `${process.env.REACT_APP_LOCAL_SERVER}user/info`,
      // url: `${process.env.REACT_APP_SERVER}user/info`,
      method: "patch",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다. 라고 한다.
      },
      data: formData,
    })
      .then(() => {
        setReqUserInfo((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
