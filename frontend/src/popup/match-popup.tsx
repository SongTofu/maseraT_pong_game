import { useState, useEffect } from "react";
import { socket } from "../App";
import { getCookie } from "../func/get-cookie";

type Props = {
  setIsMatching: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MatchPopup({ setIsMatching }: Props): JSX.Element {
  const [second, setSecond] = useState(0);
  const onClick = () => {
    setIsMatching(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(curr => curr + 1);
    }, 1000);

    socket.emit("match", { userId: getCookie("id") });

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div
      style={{ width: "300px", height: "300px", backgroundColor: "aquamarine" }}
    >
      <h1>{second}</h1>
      <button onClick={onClick}>매칭 취소</button>
    </div>
  );
}
