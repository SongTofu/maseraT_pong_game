export const nicknameOnC = (
  event: React.ChangeEvent<HTMLInputElement> & { target: HTMLInputElement },
  setNickname: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { target } = event;
  if (target.value.length) {
    setNickname(target.value);
  } else {
    setNickname("");
  }
};
