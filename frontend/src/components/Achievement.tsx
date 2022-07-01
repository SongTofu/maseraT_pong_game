import React, { useState } from "react";
import AchievementIcon from "../img/achievementIcon.svg";
import ConsecThree from "../img/consecThree.svg";
import FirstLogin from "../img/firstLogin.svg";
import FirstLose from "../img/firstLose.svg";
import FirstWin from "../img/firstWin.svg";
import ThirdWin from "../img/thirdWin.svg";

function Achievement(): JSX.Element {
  const [showAchievement, setShowAchievement] = useState(false);

  const handleMouseEnter = () => {
    setShowAchievement(true);
  };

  const handleMouseLeave = () => {
    setShowAchievement(false);
  };
  return (
    <div
      className="achivement__wrap relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img alt="achivement" src={AchievementIcon} />
      {showAchievement ? (
        <div
          className="w-[150px] h-[30px] bg-white border-black rounded-md border-[1px] absolute top-[-20px] left-[10px] flex justify-evenly items-center"
          onMouseEnter={handleMouseEnter}
        >
          <img
            alt="첫 로그인"
            title="첫 로그인"
            src={FirstLogin}
            className="w-[20px] h-[20px]"
          />
          <img
            alt="첫승"
            title="첫승"
            src={FirstWin}
            className="w-[20px] h-[20px]"
          />
          <img
            alt="3승"
            title="3승"
            src={ThirdWin}
            className="w-[20px] h-[20px]"
          />
          <img
            alt="첫패"
            title="첫패"
            src={FirstLose}
            className="w-[20px] h-[20px]"
          />
          <img
            alt="3연승"
            title="3연승"
            src={ConsecThree}
            className="w-[20px] h-[20px]"
          />
        </div>
      ) : null}
    </div>
  );
}

export default Achievement;
