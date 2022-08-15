import React, { useState, useEffect } from "react";
import Button from "../component/button/Button";
import { getCookie } from "../func/cookieFunc";

type Props = {
  onSecondAuth: () => void;
  isSecondAuth: boolean;
  setIsSecondAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SecondAuthPopup({
  onSecondAuth,
  isSecondAuth,
  setIsSecondAuth,
}: Props): JSX.Element {
  const [checkMsg, setCheckMsg] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "second-auth", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    });
  }, []);

  const onClick = () => {
    fetch(process.env.REACT_APP_API_URL + "second-auth/" + code, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then((res) => res.json())
      .then(({ matchCode }: { matchCode: boolean }) => {
        if (matchCode) {
          setIsCheck(true);
          setCheckMsg("맞음");
        } else {
          setCheckMsg("틀림");
        }
      });
  };

  const onChange = (e) => {
    setCode(e.target.value);
  };

  const onActive = () => {
    const data = new FormData();
    data.append("secondAuth", "false");
    fetch(process.env.REACT_APP_API_URL + "user/info", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
      body: data,
    });
    setIsSecondAuth((curr) => !curr);
    onSecondAuth();
  };

  return (
    <div className="w-[260px] h-[170px] flex flex-col items-center justify-center">
      <div className="my-5 mb-8">
        <label>인증 코드</label>
        <div className="flex flex-row mt-1 w-full">
          <input
            className="border-2 rounded-md w-[70%] mr-1 px-1"
            type="text"
            onChange={onChange}
            value={code}
          ></input>
          <Button tag={"확인"} disabled={isCheck} onClick={onClick} />
        </div>
        <p className="text-center mt-1 text-sm">{checkMsg}</p>
      </div>
      <Button
        className="btn-sm text-md font-main pr-6 pl-7 tracking-widest"
        tag={isSecondAuth ? "비활성화" : "활성화"}
        disabled={!isCheck}
        onClick={onActive}
      />
    </div>
  );
}
