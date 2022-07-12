import React from "react";
import Pong from "../../img/pong.png";
import ButtonOne from "../Button/ButtonOne";

function HomeContent(): JSX.Element {
  return (
    <>
      <div className="img__wrap bg-red-500 w-7/12 p-10">
        <img alt={"pong"} src={Pong} />
      </div>
      <div className="content__wrap bg-blue-500 flex flex-col justify-center w-5/12 p-10">
        <div className="text__wrap bg-green-500 flex justify-center p-10">
          <h1 className="text-3xl font-semibold w-[300px] h-[40px] text-center font-main">
            퐁게임 함 하쉴???
          </h1>
        </div>
        <div className="empty bg-violet-700 p-10"></div>
        <ButtonOne
          tag={"로 그 인"}
          onClick={() =>
            (window.location.href =
              // `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&` +
              // `redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`)
              `${process.env.REACT_APP_LOCAL_SERVER}auth/login`)
          }
        />
      </div>
    </>
  );
}

export default HomeContent;
