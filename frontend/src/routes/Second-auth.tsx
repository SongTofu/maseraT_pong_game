import { useState } from "react";
import { getCookie } from "../func/get-cookie";
import { useNavigate } from "react-router-dom";

export function SecondAuth() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const onReSend = () => {
    fetch("http://localhost:3000/second-auth/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    });
  };

  const onCodeCheck = () => {
    fetch("http://localhost:3000/second-auth/" + code, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.matchCode) {
          navigate("/game");
          console.log("코드 맞음");
        } else {
          console.log("코드 틀림");
        }
      });
  };

  const onChange = e => {
    setCode(e.target.value);
  };

  return (
    <div>
      <h1>SecondAuth</h1>
      <p>2차 인증 코드</p>
      <input onChange={onChange} value={code} />
      <button onClick={onReSend}>재전송</button>
      <div>
        <button onClick={onCodeCheck}>확인</button>
      </div>
    </div>
  );
}
