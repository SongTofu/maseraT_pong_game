import { useState, useEffect } from "react";
import { getCookie } from "../func/get-cookie";

export function SecondAuthPopup({
  onSecondAuth,
  isSecondAuth,
  setIsSecondAuth
}) {
  const [checkMsg, setCheckMsg] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "second-auth", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    });
  }, []);

  const onClick = () => {
    fetch(process.env.REACT_APP_API_URL + "second-auth/" + code, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.matchCode) {
          setIsCheck(true);
          setCheckMsg("맞음");
        } else {
          setCheckMsg("틀림");
        }
      });
  };

  const onChange = e => {
    setCode(e.target.value);
  };

  const onActive = () => {
    const data = new FormData();
    data.append("secondAuth", "false");
    fetch(process.env.REACT_APP_API_URL + "user/info", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      },
      body: data
    });
    setIsSecondAuth(curr => !curr);
    onSecondAuth(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#929292",
        position: "fixed",
        margin: "-21.438px 0px 0px -8px"
      }}
    >
      <button onClick={onSecondAuth}>X</button>
      <div>
        <label>인증 코드</label>
        <input type="text" onChange={onChange} value={code}></input>
        <button disabled={isCheck} onClick={onClick}>
          확인
        </button>
        <p>{checkMsg}</p>
      </div>
      <button disabled={!isCheck} onClick={onActive}>
        {isSecondAuth ? "비활성화" : "활성화"}
      </button>
    </div>
  );
}
