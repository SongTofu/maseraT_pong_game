import { SetterOrUpdater } from "recoil";
import { getApi } from "../api/getApi";
import { patchApi } from "../api/patchApi";

export const btnNickOnC = async (
  nickname: string,
  setDisplayRed: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayBlack: React.Dispatch<React.SetStateAction<boolean>>,
  setReqUserInfo: SetterOrUpdater<number>,
) => {
  if (nickname === "") {
    setDisplayRed(false);
    setDisplayBlack(true);
    return;
  }
  getApi(`nickname/${nickname}`)
    .then((response) => {
      const { isValidNickname } = response;
      if (isValidNickname) {
        patchApi("user/info", { nickname })
          .then(() => {
            setDisplayBlack(false);
            setDisplayRed(false);
            setReqUserInfo((prev) => prev + 1);
            window.location.href = `http://${window.location.host}/game`;
          })
          .catch((err) => console.log(err));
      } else {
        setDisplayBlack(false);
        setDisplayRed(true);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
