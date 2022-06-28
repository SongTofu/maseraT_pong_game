import React from "react";
import HomeContent from "../components/HomeContent";

function Home(): JSX.Element {
  return (
    <div className="wrap bg-red-900 p-10 flex items-center my-20 mx-28 min-w-max">
      <HomeContent />
    </div>
  );
}

export default Home;
