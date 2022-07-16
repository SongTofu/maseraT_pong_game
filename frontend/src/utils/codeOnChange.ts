export const codeOnChange = (
  event: React.ChangeEvent<HTMLInputElement> & { target: HTMLInputElement },
  setCode: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { target } = event;
  if (target.value.length) {
    setCode(target.value);
  } else {
    setCode("");
  }
};
