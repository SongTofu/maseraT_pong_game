import React from "react";
import HomeContent from "../components/HomeContent";
import PopUpParent from "../components/PopUpParent";

function Home(): JSX.Element {
  return (
    <div className="wrap bg-red-900 p-10 flex justify-center my-20 mx-28 min-w-max">
      <HomeContent />
      <PopUpParent mainText="프로필 보기" />
    </div>
  );
}

export default Home;
