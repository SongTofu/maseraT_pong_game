import { getApi } from "../func/get-api";
import { useState, useEffect, useRef } from "react";
import { getToken } from "../func/get-token";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [nickname, setNickname] = useState("");
  const [imgUrl, setImgUrl] = useState();
  const [btnEnable, setBtnEnable] = useState(false);
  const [checkMsg, setCheckMsg] = useState("닉네임 중복 체크를 해주세요");
  const [profile, setProfile] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getApi("user/info").then(json => {
      setNickname(json.nickname);
      setImgUrl("http://localhost:3000/" + json.profileImg);
    });
  }, []);

  const imageInput = useRef(null);

  const onClick = () => {
    imageInput.current.click();
  };

  const onFileChange = e => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setProfile(e.target.files[0]);
  };

  const onInputChange = e => {
    setNickname(e.target.value);
  };

  const onCheckNickname = () => {
    getApi("nickname/" + nickname).then(json => {
      if (json.isValidNickname) {
        setBtnEnable(false);
        setCheckMsg("사용 가능한 닉네임입니다.");
      } else {
        setBtnEnable(true);
        setCheckMsg("사용 불가능한 닉네임입니다.");
      }
    });
  };

  const onProfileUpdate = () => {
    const data = new FormData();
    data.append("profile", profile);
    data.append("nickname", nickname);
    fetch("http://localhost:3000/user/info", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + getToken()
      },
      body: data
    });
    navigate("/game");
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="file"
        style={{ display: "none" }}
        ref={imageInput}
        onChange={onFileChange}
      />
      <img src={imgUrl} alt="" onClick={onClick} />
      <div>
        <input type="text" onChange={onInputChange} value={nickname}></input>
        <button onClick={onCheckNickname}>닉네임 중복 체크</button>
      </div>
      <div>
        <h2>{checkMsg}</h2>
      </div>
      <div>
        <button disabled={btnEnable} onClick={onProfileUpdate}>
          수정
        </button>
      </div>
    </div>
  );
}
