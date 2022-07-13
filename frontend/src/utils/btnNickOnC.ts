import { SetterOrUpdater } from "recoil";
import { getApi } from "../api/getApi";
import { patchApi } from "../api/patchApi";

export const btnNickOnC = async (
  nickname: string,
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>,
  setReqUserInfo: SetterOrUpdater<number>,
) => {
  getApi(`nickname/${nickname}`)
    .then((response) => {
      const { isValidNickname } = response;
      isValidNickname
        ? patchApi("user/info", { nickname })
            .then(() => {
              setDisplay(false);
              setReqUserInfo((prev) => prev + 1);
              window.location.href = `http://${window.location.host}/game`;
            })
            .catch((err) => console.log(err))
        : setDisplay(true);
    })
    .catch((err) => {
      console.log(err);
    });
};
