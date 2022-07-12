import { SetterOrUpdater } from "recoil";
import { patchApi } from "../api/patchApi";

export const imgUploadOnC = async (
  event: React.ChangeEvent<HTMLInputElement> & { target: HTMLInputElement },
  setReqUserInfo: SetterOrUpdater<number>,
) => {
  const { target } = event;
  const formData = new FormData();
  if (target.files?.length) {
    formData.append("profile", target.files[0]);
    patchApi("user/info", formData)
      .then(() => {
        setReqUserInfo((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
