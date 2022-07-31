import { useState, useEffect, useRef } from "react";
import { getCookie } from "../func/get-cookie";
import { useNavigate } from "react-router-dom";
import { SecondAuthPopup } from "../popup/second-auth-popup";
import Button from "../component/button/Button";

export function Login() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState();
  const [isSecondAuth, setIsSecondAuth] = useState(false);

  const [imgUrl, setImgUrl] = useState();
  const [btnEnable, setBtnEnable] = useState(false);
  const [checkMsg, setCheckMsg] = useState("닉네임 중복 체크를 해주세요");
  const [secondAuthBtn, setSecondAuthBtn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // getApi("user/info").then(json => {
    fetch(process.env.REACT_APP_API_URL + "user/info", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setNickname(json.nickname);
        setImgUrl(process.env.REACT_APP_API_URL + json.profileImg);
        setIsSecondAuth(json.secondAuth);
        setEmail(json.email);
      });
  }, []);

  const imageInput = useRef(null);

  // const onClick = () => {
  //   imageInput.current.click();
  // };

  const onFileChange = (e: any) => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setProfile(e.target.files[0]);
  };

  const onInputChange = (e: any) => {
    setNickname(e.target.value);
  };

  const onCheckNickname = () => {
    // getApi("nickname/" + nickname).then(json => {
    fetch(process.env.REACT_APP_API_URL + "nickname" + nickname, {
      method: "GET",
      headers: {
        Authorization: getCookie("token"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
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
    fetch(process.env.REACT_APP_API_URL + "user/info", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
      body: data,
    });
    navigate("/game");
  };

  const onSecondAuth = () => {
    setSecondAuthBtn((curr) => !curr);
  };

  return (
    <div className="flex flex-col justify-evenly items-center h-[500px] ">
      {secondAuthBtn ? (
        <SecondAuthPopup
          onSecondAuth={onSecondAuth}
          isSecondAuth={isSecondAuth}
          setIsSecondAuth={setIsSecondAuth}
        />
      ) : null}
      <h1>Login</h1>
      <div>
        <input
          type="file"
          // style={{ display: "none" }}
          ref={imageInput}
          onChange={onFileChange}
        />
        <img
          src={imgUrl}
          alt=""
          // onClick={onClick}
        />
      </div>
      <div className="flex flex-row">
        <input
          type="text"
          className="border-2 rounded "
          onChange={onInputChange}
          value={nickname}
        ></input>
        <Button
          tag={"닉네임 중복 체크"}
          className={"btn-sm"}
          onClick={onCheckNickname}
        />
      </div>
      <h2>{checkMsg}</h2>
      <div>
        <h3>이메일: {email}</h3>
        {isSecondAuth ? (
          <button onClick={onSecondAuth}>2차인증 비활성화</button>
        ) : (
          <button onClick={onSecondAuth}>2차인증 활성화</button>
        )}
      </div>
      <div>
        <Button
          tag={"수정"}
          className={"btn-lg w-[200px]"}
          disabled={btnEnable}
          onClick={onProfileUpdate}
        />
      </div>
    </div>
  );
}
